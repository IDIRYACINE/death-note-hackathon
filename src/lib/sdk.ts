import { useAction } from "convex/react";
import { GenericId } from "convex/values";
import { api } from "../../convex/_generated/api";


export function useHostGame(){
    const hostGame = useAction(api.host.hostGame);

    return {
        execute : (props: { maxPlayers?: number | undefined; turnTimerInSeconds?: number | undefined; hostId: GenericId<"players">; password: string; }) => hostGame(props)
    }
}

export function useJoinGame(){
    const joinGame = useAction(api.host.joinGame);

    return {
        execute : (props: { hostId: GenericId<"players">; password: string; playerId: GenericId<"players">; }) => joinGame(props)
    }
}