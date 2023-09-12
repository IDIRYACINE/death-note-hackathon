import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel";
import { useAction } from "convex/react"

interface VoteProps {
    gameId: string;
    playerId: string;
    targetId: string;
    voteType: string;
    isKiraOrL: boolean;
    statusId: string;
}
export const useVote = () => {
    const vote = useAction(api.game.vote)

    return (props:VoteProps) => {
        const voteProps = {
            gameId: props.gameId as Id<"games">,
            playerId: props.playerId,
            targetId: props.statusId as Id<"playersStatus"> ,
            voteType: props.voteType,
            voteImpact: props.isKiraOrL ? 5 : 10,
        }

        vote(voteProps)
    }
}