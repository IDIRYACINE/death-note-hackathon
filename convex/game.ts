import { v } from "convex/values";
import { PlayerStatusScehma } from "./schema";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { action, internalMutation, mutation } from "./_generated/server";
import { randomIndex } from "./_helpers/helpers";
import { StartGameResponse } from "./_types/game";



export const startGame = action({
    args: { hostId: v.string() },
    handler: async (ctx, args):Promise<StartGameResponse> => {
        const lobby = (await ctx.runQuery(internal.host.readLobby, { hostId: args.hostId, byPassPassword: true }))!

        let status = 200
        let message = "game started"

        status = lobby.playersCount < lobby.maxPlayers ? 400 : status
        message = lobby.playersCount < lobby.maxPlayers ? "not enough players" : message

        status = lobby.gameStarted ? 400 : status
        message = lobby.gameStarted ? "game already started" : message

        let gameId :Id<"games">|null = null

        if (status == 200) {
             gameId = await ctx.runMutation(internal.game.setupGame, { hostId: args.hostId,
                playerIds: lobby.playerIds,
                turnTimerInSeconds: lobby.turnTimerInSeconds,
                lobbyId: lobby._id })
        }

        return {
            status,
            message,
            gameId
        }

    }
})


export const endGame = action({
    args: { hostId: v.string() },
    handler: async (ctx, args) => {
        
    }
})


export const setupGame = internalMutation({
    args: {
        hostId: v.string(),
        playerIds: v.array(v.string()),
        turnTimerInSeconds: v.number(),
        lobbyId: v.id("lobbies"),
    },
    handler: async (ctx, args) : Promise<Id<"games">> => {
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
            turnTimerInSeconds: args.turnTimerInSeconds,
            playerTurnId: args.playerIds[0],
            playerIds: args.playerIds,
            lobbyId: args.lobbyId,
        })

        return gameId

    }
})