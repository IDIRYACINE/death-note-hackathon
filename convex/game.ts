import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { action, internalMutation,  query } from "./_generated/server";
import { randomIndex } from "./_helpers/helpers";
import { StartGameResponse } from "./_types/game";



export const startGame = action({
    args: { hostId: v.string() },
    handler: async (ctx, args): Promise<StartGameResponse> => {
        const lobby = (await ctx.runQuery(internal.host.readLobby, { hostId: args.hostId, byPassPassword: true }))!

        let status = 200
        let message = "game started"

        status = lobby.playersCount < lobby.maxPlayers ? 400 : status
        message = lobby.playersCount < lobby.maxPlayers ? "not enough players" : message

        status = lobby.gameStarted ? 400 : status
        message = lobby.gameStarted ? "game already started" : message

        let gameId: Id<"games"> | null = null

        if (status == 200) {
            gameId = await ctx.runMutation(internal.game.setupGame, {
                hostId: args.hostId,
                playerIds: lobby.playerIds,
                roundTimerInSeconds: lobby.roundTimerInSeconds,
                lobbyId: lobby._id
            })
        }

        return {
            status,
            message,
            gameId
        }

    }
})


export const endGame = action({
    args: { hostId: v.string(),gameId: v.optional(v.id("games")),lobbyId: v.id("lobbies") },
    handler: async (ctx, args) => {

        

    }
})


export const setupGame = internalMutation({
    args: {
        hostId: v.string(),
        playerIds: v.array(v.string()),
        roundTimerInSeconds: v.number(),
        lobbyId: v.id("lobbies"),
    },
    handler: async (ctx, args): Promise<Id<"games">> => {
        const playersCount = args.playerIds.length

        let kiraIndex = randomIndex(playersCount)
        let lawlietIndex = randomIndex(playersCount)
        while ((playersCount > 1) && (kiraIndex == lawlietIndex)) {
            lawlietIndex = randomIndex(playersCount)
        }

        const kiraId = args.playerIds[kiraIndex]
        const lawlietId = args.playerIds[lawlietIndex]


        const gameId = await ctx.db.insert("games", {
            hostId: args.hostId,
            kiraId,
            lawlietId,
            roundTimerInSeconds: args.roundTimerInSeconds,
            round: 1,
            playerIds: args.playerIds,
            lobbyId: args.lobbyId,
        })

        return gameId

    }
})

export const loadGame = query({
    args: { lobbyId: v.id("lobbies") },
    handler: async (ctx, args) => {

        const game = await ctx.db.query("games")
            .withIndex("by_lobbyId", (q) => q.eq("lobbyId", args.lobbyId))
            .first()


        return game
    }
})