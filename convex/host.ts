import { v } from "convex/values";
import { action, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import {  internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

const hostGameArgs = {
  hostId: v.id("players"),
  password: v.string(),
  maxPlayers: v.optional(v.number()),
  turnTimerInSeconds: v.optional(v.number()),
}

export const createLobby = internalMutation({
  args: hostGameArgs,
  handler: async (ctx, args) => {

    const lobby = {
      hostId: args.hostId,
      password: args.password,
      maxPlayers: args.maxPlayers ?? 5,
      playersCount : 1,
      gameStarted: false,
      turnTimerInSeconds: args.turnTimerInSeconds ?? 60,
    }

    const lobbyId = await ctx.db.insert("lobbies", lobby);

    return lobbyId;
  },
});

export const hostGame = action({
  args: hostGameArgs,
  handler: async (ctx, args) => {

    const lobbyId = await ctx.runMutation(internal.host.createLobby,args)

    await ctx.runMutation(internal.host.addPlayerToLobby,{
      lobbyId : lobbyId,
      playerId: args.hostId
    })

  },
});


export const readLobby = internalQuery({
  args: {
    hostId: v.id("players"),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<Doc<"lobbies"> | null> => {

    const lobby = await ctx.db.query("lobbies")
      .filter((q) => q.and(q.eq(q.field("hostId"), args.hostId), q.eq(q.field("password"), args.password)))
      .first();

    return lobby;
  },
})

export const addPlayerToLobby= internalMutation({
  args: {
    lobbyId: v.id("lobbies"),
    playerId : v.id("players")
  },
  handler: async (ctx, args) => {

    await ctx.db.insert("playersStatus",{
      lobbyId : args.lobbyId,
      playerId : args.playerId,
      ready : false,
      kiraMeter : 0,
      lawlietMeter : 0,

    })

  },
})

export const joinGame = action({
  args: {
    hostId: v.id("players"),
    password: v.string(),
    playerId :  v.id("players"),
  },
  handler: async (ctx, args) => {

    const lobbyArgs = {
      hostId: args.hostId,
      password: args.password,
    }

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
        message = lobby.gameStarted? "game already started" : message
        
        const wrongPassword = lobby.password === args.password
        status = wrongPassword ? 400 : status
        message = wrongPassword ? "wrong passowrd" : message
      }

      return {
        status,
        message
      }
    })
      ()

    if (canJoinLobby.status === 400) {
      ctx.runMutation(internal.host.addPlayerToLobby,{
        playerId : args.playerId,
        lobbyId : lobby!._id
      })

    }


    return canJoinLobby;
  },
});


export const startGame = action({
  args: hostGameArgs,
  handler: async (ctx, args) => {


  },
});


export const tearDownGame = action({
  args: {lobbyId:v.id("lobbies"),gameId:v.id("games")},
  handler: async (ctx, args) => {

  await ctx.runMutation(internal.host.deleteLobby,args)


  },
});

export const deleteLobby = internalMutation({
  args: {lobbyId:v.id("lobbies")},
  handler: async (ctx, args) => {

  ctx.db.delete(args.lobbyId);

  const playersStatus = await ctx.db.query("playersStatus").filter((q) => q.eq(q.field("lobbyId"), args.lobbyId)).collect();

  playersStatus.forEach(async (playerStatus) => {
    await ctx.db.delete(playerStatus._id);
  })

  

  },
});