import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel";
import { useAction } from "convex/react"

interface VoteProps {
    gameId: string;
    playerId: string;
    targetStatusId: string;
    voteType: string;
    isKiraOrL: boolean;
    kiraStatusId: string;
    lawlietStatusId: string;
}
export const useVote = () => {
    const vote = useAction(api.game.vote)

    return (props:VoteProps) => {
        const voteProps = {
            gameId: props.gameId as Id<"games">,
            playerId: props.playerId,
            targetId: props.targetStatusId as Id<"playersStatus"> ,
            voteType: props.voteType,
            voteImpact: props.isKiraOrL ? 5 : 10,
            lawlietStatusId: props.lawlietStatusId as Id<"playersStatus">,
            kiraStatusId: props.kiraStatusId as Id<"playersStatus">,
        }

        vote(voteProps)
    }
}