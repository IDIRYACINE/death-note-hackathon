import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { useAction } from "convex/react"

interface BaseArgs {
    targetId: Id<"playersStatus">,
    userId: Id<"playersStatus">,
}

interface ProtectArgs extends BaseArgs {
    actionType: "protectKira" | "protectLawliet",
}
export const useProtect = () => {
    const action = useAction(api.actions.usePlayerAction)

    return ({ targetId, userId, actionType }: ProtectArgs) => {
        action(
            {
                targetId,
                userId,
                actionType,
            }
        )
    }
}

export const useKill = () => {
    const action = useAction(api.actions.usePlayerAction)

    return ({ targetId, userId }: BaseArgs) => {
        action(
            {
                targetId,
                userId,
                actionType: "kill",
            }
        )
    }
}

export const useJail = () => {
    const action = useAction(api.actions.usePlayerAction)

    return ({ targetId, userId }: BaseArgs) => {
        action(
            {
                targetId,
                userId,
                actionType: "jail",
            }
        )
    }
}

export const useInvestigate = () => {
    const action = useAction(api.actions.usePlayerAction)

    return ({ targetId, userId }: BaseArgs) => {
        action(
            {
                targetId,
                userId,
                actionType: "investigate",
            }
        )
    }
}

interface PlayerActionProps {
    displayFeedback: (message: string, errorCode?: number) => void,
    sucessMessage: string,
    failMessage: string
}
export const usePlayerAction = (props?: PlayerActionProps) => {
    const action = useAction(api.actions.usePlayerAction)

    const displayFeedbackMessage = (executed: boolean) => {
        if (props) {
            const { displayFeedback, sucessMessage, failMessage } = props
            displayFeedback(
                executed ? sucessMessage : failMessage,
                executed ? undefined : 400
            )
        }
    }

    const protect = ({ targetId, userId, actionType }: ProtectArgs) => {
        action(
            {
                targetId,
                userId,
                actionType,
            }
        ).then((res) => displayFeedbackMessage(res.executed))
    }

    const investigate = ({ targetId, userId }: BaseArgs) => {
        action(
            {
                targetId,
                userId,
                actionType: "investigate",
            }
        ).then((res) => displayFeedbackMessage(res.executed))

    }

    const kill = ({ targetId, userId }: BaseArgs) => {
        action(
            {
                targetId,
                userId,
                actionType: "kill",
            }
        ).then((res) => displayFeedbackMessage(res.executed))
    }

    const jail = ({ targetId, userId }: BaseArgs) => {
        action(
            {
                targetId,
                userId,
                actionType: "jail",
            }
        ).then((res) => displayFeedbackMessage(res.executed))
    }

    return {
        protect,
        kill,
        jail,
        investigate
    }
}