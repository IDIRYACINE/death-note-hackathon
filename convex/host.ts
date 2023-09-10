import { v } from "convex/values";
import { action, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import { ReadLobbyResponse } from "./_types/host";

const hostGameArgs = {
  hostId: v.string(),
  password: v.string(),
  maxPlayers: v.optional(v.number()),
  turnTimerInSeconds: v.optional(v.number()),
}

export const createLobby = internalMutation({
  args: hostGameArgs,
  handler: async (ctx, args): Promise<Id<"lobbies">> => {

    const lobby = {
      hostId: args.hostId,
      password: args.password,
      maxPlayers: args.maxPlayers ?? 5,
      playersCount: 1,
      gameStarted: false,
      turnTimerInSeconds: args.turnTimerInSeconds ?? 60,
    }

    const lobbyId = await ctx.db.insert("lobbies", lobby);

    return lobbyId;
  },
});

export const hostAlreadyExists = internalQuery({
  args: {hostId: v.string()},
  handler: async (ctx, args) => {
    const lobby = await ctx.db.query("lobbies")
      .filter((q) => q.eq(q.field("hostId"), args.hostId))
      .first();

    return lobby?._id
  }
})

export const hostGame = action({
  args: hostGameArgs,
  handler: async (ctx, args): Promise<Id<"lobbies">> => {

    const lobbyExistsId = await ctx.runQuery(internal.host.hostAlreadyExists, {hostId: args.hostId})

    if(lobbyExistsId){
      return lobbyExistsId
    }

    const lobbyId = await ctx.runMutation(internal.host.createLobby, args)

    await ctx.runMutation(internal.host.addPlayerToLobby, {
      lobbyId: lobbyId,
      playerId: args.hostId
    })

    return lobbyId

  },
});

export const loadLobby = query({
  args: { lobbyId: v.id("lobbies") },
  handler: async (ctx, args): Promise<ReadLobbyResponse> => {

    const lobby = await ctx.db.query("lobbies")
      .filter((q) => q.eq(q.field("_id"), args.lobbyId))
      .first();

    let players = null;

    if (lobby) {
      players = await ctx.db.query("playersStatus").
        filter((q) => q.eq(q.field("lobbyId"), lobby._id))
        .collect()
    }

    return { lobby, players };
  }
})


export const readLobbyPlayers = internalQuery({
  args: {
    lobbyId: v.id("lobbies"),
  },
  handler: async (ctx, args) => {

    let players = await ctx.db.query("playersStatus").
      filter((q) => q.eq(q.field("lobbyId"), args.lobbyId))
      .collect();



    return players
  }


})

export const readLobby = internalQuery({
  args: {
    hostId: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<Doc<"lobbies"> | null> => {



    const lobby = await ctx.db.query("lobbies")
      .filter((q) => q.and(q.eq(q.field("hostId"), args.hostId), q.eq(q.field("password"), args.password)))
      .first();


    return lobby;
  },
})

export const addPlayerToLobby = internalMutation({
  args: {
    lobbyId: v.id("lobbies"),
    playerId: v.string()
  },
  handler: async (ctx, args) => {

    const player = (await ctx.db.query("players").filter((q) => q.eq(q.field("tokenIdentifier"), args.playerId)).first())!
    
    const data = {...player,_id:undefined,_creationTime:undefined}

    await ctx.db.insert("playersStatus", {
      lobbyId: args.lobbyId,
      playerId: args.playerId,
      player : data,
      ready: false,
      kiraMeter: 0,
      lawlietMeter: 0,

    })

  },
})

export const joinGame = action({
  args: {
    hostId: v.id("players"),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<
    {
      status: number,
      message: string,
      lobby: Doc<"lobbies"> | null,
    }> => {

    const lobbyArgs = {
      hostId: args.hostId,
      password: args.password,
    }

    const user = await ctx.auth.getUserIdentity()

    if (!user) {
      throw new Error("user not logged in")
    }

    const playerId = user.tokenIdentifier

    const lobby = await ctx.runQuery(internal.host.readLobby, lobbyArgs);

    const canJoinLobby = (() => {
      let status = 200
      let message = "joined the lobby"

      status = !lobby ? 400 : status
      message = !lobby ? "lobby doesn't exist" : message

      if (lobby) {
        const lobbyFull = lobby.playersCount === lobby.maxPlayers
        status = lobbyFull ? 400 : status
        message = lobbyFull ? "lobby full" : message

        status = lobby.gameStarted ? 400 : status
        message = lobby.gameStarted ? "game already started" : message

        const wrongPassword = lobby.password === args.password
        status = wrongPassword ? 400 : status
        message = wrongPassword ? "wrong passowrd" : message
      }

      return {
        status,
        message,
      }
    })
      ()

    const isHostMaster = lobby?.hostId === playerId

    if (canJoinLobby.status === 400 && !isHostMaster) {
      ctx.runMutation(internal.host.addPlayerToLobby, {
        playerId: playerId,
        lobbyId: lobby!._id
      })

    }


    return {
      ...canJoinLobby,
      lobby
    };
  },
});


export const deleteLobby = internalMutation({
  args: { lobbyId: v.id("lobbies") },
  handler: async (ctx, args) => {

    ctx.db.delete(args.lobbyId);

    const playersStatus = await ctx.db.query("playersStatus").filter((q) => q.eq(q.field("lobbyId"), args.lobbyId)).collect();

    playersStatus.forEach(async (playerStatus) => {
      await ctx.db.delete(playerStatus._id);
    })



  },
});


export const updatePlayerReadyStatus = mutation({
  args: {id: v.id("playersStatus"), ready: v.boolean() },
  handler: async (ctx, args) => {
    const playerId = await ctx.auth.getUserIdentity()

    if (!playerId) {
      throw new Error("user not logged in")
    }
    const {id,ready} = args

    await ctx.db.patch(id, { ready });

  }
})