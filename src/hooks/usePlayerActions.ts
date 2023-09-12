import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { useAction } from "convex/react"

interface BaseArgs {
    targetId: Id<"playersStatus">,
    userId: Id<"playersStatus">,
}

interface ProtectArgs extends BaseArgs{
    actionType: "protectKira" | "protectLawliet",
}
export const useProtect = () => {
    const action = useAction(api.actions.usePlayerAction)

    return ({targetId,userId,actionType} : ProtectArgs) => {
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
    
    return ({targetId,userId} :BaseArgs) => {
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

    return ({targetId,userId} : BaseArgs) => {
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

    return ({targetId,userId} : BaseArgs) => {
        action(
            {
                targetId,
                userId,
                actionType: "investigate",
            }
        )
    }
}


export const usePlayerAction = () => {
    const action = useAction(api.actions.usePlayerAction)

    const protect = ({targetId,userId,actionType} : ProtectArgs) => {
        action(
            {
                targetId,
                userId,
                actionType,
            }
        )
    }

    const investigate = ({targetId,userId} : BaseArgs) => {
        action(
            {
                targetId,
                userId,
                actionType: "investigate",
            }
        )
    }

    const kill = ({targetId,userId} :BaseArgs) => {
        action(
            {
                targetId,
                userId,
                actionType: "kill",
            }
        )
    }

    const jail = ({targetId,userId} : BaseArgs) => {
        action(
            {
                targetId,
                userId,
                actionType: "jail",
            }
        )
    }

    return {
        protect,
        kill,
        jail,
        investigate
    }
}