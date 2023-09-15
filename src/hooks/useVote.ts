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
interface VoteBaseProps {
    displayFeedback: (message: string, errorCode?: number) => void,
    sucessMessage: string,
    failMessage: string
}
export const useVote = (baseProps?: VoteBaseProps) => {
    const vote = useAction(api.game.vote)

    return (props: VoteProps) => {

        const displayFeedbackMessage = (executed: boolean) => {
            if (baseProps) {
                const { displayFeedback, sucessMessage, failMessage } = baseProps
                displayFeedback(
                    executed ? sucessMessage : failMessage,
                    executed ? undefined : 400
                )
            }
        }
        const voteProps = {
            gameId: props.gameId as Id<"games">,
            playerId: props.playerId,
            targetId: props.targetStatusId as Id<"playersStatus">,
            voteType: props.voteType,
            voteImpact: props.isKiraOrL ? 5 : 10,
            lawlietStatusId: props.lawlietStatusId as Id<"playersStatus">,
            kiraStatusId: props.kiraStatusId as Id<"playersStatus">,
        }

        vote(voteProps).then((res) => displayFeedbackMessage(!res.alreadyVoted))
    }
}