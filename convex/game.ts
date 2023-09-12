import { v } from "convex/values";
import { GameSchema, VoteSchema } from "./schema";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import { action, internalAction, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { alreadyVoted, IsGameOver, IsVotingOver, randomIndex } from "./_helpers/helpers";
import { StartGameResponse } from "./_types/game";



export const startGame = action({
    args: { lobbyId: v.id("lobbies") },
    handler: async (ctx, args): Promise<StartGameResponse> => {
        const lobby = (await ctx.runQuery(internal.host.readLobby, { lobbyId: args.lobbyId, byPassPassword: true }))!

        let status = 200
        let message = "game started"

        status = lobby.playersCount < lobby.maxPlayers ? 400 : status
        message = lobby.playersCount < lobby.maxPlayers ? "not enough players" : message

        status = lobby.gameStarted ? 400 : status
        message = lobby.gameStarted ? "game already started" : message

        let gameId: Id<"games"> | null = null

        if (status == 200) {
            gameId = await ctx.runMutation(internal.game.setupGame, {
                hostId: lobby.hostId,
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
    args: { hostId: v.string(), gameId: v.optional(v.id("games")), lobbyId: v.id("lobbies") },
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

        const { roundTimerInSeconds } = args

        const gameId = await ctx.db.insert("games", {
            hostId: args.hostId,
            kiraId,
            lawlietId,
            roundTimerInSeconds,
            round: 1,
            playerIds: args.playerIds,
            lobbyId: args.lobbyId,
            isVoting: false,
            roundVotes: [],
            roundStartTimestamp: Date.now()
        })

        await ctx.db.patch(args.lobbyId, {
            gameStarted: true
        })

        await ctx.scheduler.runAfter(roundTimerInSeconds * 1000, internal.game.startVotingPhase,
            { gameId, roundTimerInSeconds })

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

export const vote = action({
    args: { voteImpact: v.number(), voteType: v.string(), targetId: v.id("playersStatus"), playerId: v.string(), gameId: v.id("games"), },
    handler: async (ctx, args): Promise<{ alreadyVoted: boolean }> => {
        const voted = await ctx.runQuery(internal.game.checkIfPlayerVoted, { gameId: args.gameId, playerId: args.playerId })

        const vote = {
            playerId: args.playerId,
            voteImpact: args.voteImpact,
            voteType: args.voteType,
            targetId: args.targetId
        }
        if (!voted.voted) {
            voted.game.roundVotes.push(vote)
            await ctx.runMutation(internal.game.addVote, { gameId: args.gameId, vote, votes: voted.game.roundVotes, })
        }

        await ctx.runAction(internal.game.endVotingPhase, { game: voted.game })

        return {
            alreadyVoted: voted.voted
        }
    }
})

export const checkIfPlayerVoted = internalQuery({
    args: { gameId: v.id("games"), playerId: v.string() },
    handler: async (ctx, args) => {

        let game = (await ctx.db.query("games")
            .filter((q) => q.eq((q.field("_id")), args.gameId))
            .first())!

        const votes = game.roundVotes

        const voted = alreadyVoted(args.playerId, votes)

        const gameRes = {
            _id: game._id,
            hostId: game.hostId,
            kiraId: game.kiraId,
            lawlietId: game.lawlietId,
            roundTimerInSeconds: game.roundTimerInSeconds,
            round: game.round,
            playerIds: game.playerIds,
            lobbyId: game.lobbyId,
            isVoting: game.isVoting,
            roundVotes: game.roundVotes,
            roundStartTimestamp: game.roundStartTimestamp

        }

        return {
            voted,
            game: gameRes
        }
    }
})

export const addVote = internalMutation({
    args: {
        gameId: v.id("games"),
        vote: v.object(VoteSchema),
        votes: v.array(v.object(VoteSchema)),

    },
    handler: async (ctx, args) => {
        const { vote, votes, } = args

        await ctx.db.patch(args.gameId, {
            roundVotes: votes
        })

        const status = await ctx.db.get(vote.targetId)


        const updatedStatus: Partial<Doc<"playersStatus">> = {

        }

        if (vote.voteType == "kira") {
            updatedStatus.kiraMeter = status!.kiraMeter + vote.voteImpact
        }

        if (vote.voteType == "lawliet") {
            updatedStatus.lawlietMeter = status!.lawlietMeter + vote.voteImpact
        }

        await ctx.db.patch(vote.targetId, updatedStatus)

    }
})

export const startVotingPhase = internalAction({
    args: { gameId: v.id("games"), roundTimerInSeconds: v.number() },
    handler: async (ctx, args) => {
        const gameEnded = false
        const { gameId, roundTimerInSeconds } = args
        if (!gameEnded) {
            await ctx.runMutation(internal.game.startVoting, { gameId: args.gameId })
            await ctx.scheduler.runAfter(roundTimerInSeconds * 1000, internal.game.startVoting, { gameId })

        }
    }
})

export const startVoting = internalMutation({
    args: { gameId: v.id("games") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.gameId, {
            isVoting: true
        })
    }
})


export const endVotingPhase = internalAction({
    args: { game: v.object({ ...GameSchema, _id: v.id("games") }), },
    handler: async (ctx, args) => {
        const { game } = args

        const isGameOver = IsGameOver(game)
        const isVotingOver = IsVotingOver(game)

        if (isVotingOver) {
            await ctx.runMutation(internal.game.endVoting, { gameId: game._id, votes: game.roundVotes, playersCount: game.playerIds.length, round: game.round })
            
            if (!isGameOver) {
                await ctx.runMutation(internal.game.startNextRound, { gameId: game._id, round: game.round })
                await ctx.scheduler.runAfter(game.roundTimerInSeconds * 1000, internal.game.startVotingPhase, { gameId: game._id, roundTimerInSeconds: game.roundTimerInSeconds })
            }
        }

       
    },
})

export const endVoting = internalMutation({
    args: { gameId: v.id("games"), votes: v.array(v.object(VoteSchema)), playersCount: v.number(), round: v.number() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.gameId, {
            isVoting: false,
        })

    }
})

export const startNextRound = internalMutation({
    args: { gameId: v.id("games"), round: v.number() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.gameId, {
            roundVotes: [],
            round: args.round + 1,
            roundStartTimestamp: Date.now()
        })
    }
})
