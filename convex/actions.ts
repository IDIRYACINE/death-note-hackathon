import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action, internalMutation } from "./_generated/server";


export const usePlayerAction = action(
    {
        args: {
            targetId: v.id("playersStatus"),
            userId: v.id("playersStatus"),
            actionType: v.string(),
            revealedSecretsInReverse: v.optional(v.number()),
        },
        handler: async (ctx, args) => {

            switch (args.actionType) {
                case "kill":
                    await ctx.runMutation(internal.actions.kill, { target: args.targetId });
                    break;
                case "jail":
                    await ctx.runMutation(internal.actions.jail, { target: args.targetId });
                    break;
                case "investigate":
                    await ctx.runMutation(internal.actions.investigate, { target: args.targetId, revealedSecretsInReverse: args.revealedSecretsInReverse ?? 5 });
                    break;
                case "protectKira":
                    await ctx.runMutation(internal.actions.protect, { target: args.targetId, userId: args.userId, meterType: "k" });
                    break;

                default:
                    await ctx.runMutation(internal.actions.protect, { target: args.targetId, userId: args.userId, meterType: "l" });

                    break;
            }

            await ctx.runMutation(internal.actions.updateRemainingActions, {
                userId: args.userId,
                remainingActions: 0
            })
        }
    }
)

export const protect = internalMutation({
    args: { target: v.id("playersStatus"), meterType: v.string(), userId: v.id("playersStatus") },
    handler: async (ctx, args) => {

        const upadtedFields: {
            kiraMeter?: number,
            lawlietMeter?: number
        } = {
            kiraMeter: undefined,
            lawlietMeter: undefined
        }

        if (args.meterType === "k") {
            upadtedFields.kiraMeter = -5
            delete upadtedFields.lawlietMeter
        }

        if (args.meterType === "l") {
            upadtedFields.lawlietMeter = -5
            delete upadtedFields.kiraMeter
        }

        await ctx.db.patch(args.target, upadtedFields)

    }
})

export const kill = internalMutation({
    args: { target: v.id("playersStatus") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.target, { alive: false })
    }
})

export const jail = internalMutation({
    args: { target: v.id("playersStatus") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.target, { jailed: true })
    }
})

export const investigate = internalMutation({
    args: { target: v.id("playersStatus"), revealedSecretsInReverse: v.number() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.target, { revealedSecretsInReverse: args.revealedSecretsInReverse - 1 })
    }
})

export const updateRemainingActions = internalMutation({
    args: { userId: v.id("playersStatus"), remainingActions: v.number() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.userId, { remainingActions: args.remainingActions })
    }
})

export const replenishActions = internalMutation({
    args: { lobbyId: v.id("lobbies") },
    handler: async (ctx, args) => {
        const players = await ctx.db.query("playersStatus").withIndex
            ("by_lobbyId_playerId",
                (q) => q.eq("lobbyId", args.lobbyId)
            )
            .collect()

        for (const player of players) {
            await ctx.db.patch(player._id, { remainingActions: 1 })
        }
    }
})