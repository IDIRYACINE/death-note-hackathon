import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const sendMessage = mutation({
    args: {
        playerId: v.string(),
        message: v.string(),
        isKira: v.boolean(),
        isLawliet: v.boolean(),
        gameId: v.id("games"),
        round: v.number(),
        avatar: v.string(),
        name: v.string(),

    },
    handler: async (ctx, args) => {

        await ctx.db.insert("chat", {
            gameId: args.gameId,
            message: args.message,
            author: args.name,
            senderId: args.playerId,
            avatar: args.avatar,
            round: args.round,
        })
    }
})

export const loadRoundMessages = query({
    args: {
        gameId: v.id("games"),
        round: v.number(),
    },
    handler: async (ctx, args) => {
        
       return  await ctx.db.query("chat")
       .withIndex("by_gameId_round",
       (q) => q.eq("gameId", args.gameId).eq("round", args.round))
        .collect()
    },
})