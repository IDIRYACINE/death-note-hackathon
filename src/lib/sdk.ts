import { useAction } from "convex/react";
import { GenericId } from "convex/values";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "@convex/_generated/dataModel";



interface HostGameProps {
  maxPlayers?: number | undefined; roundTimerInSeconds?: number | undefined; hostId: string; password: string;
}

export function useHostGame() {
  const hostGame = useAction(api.host.hostGame);

  return {
    execute: async (props:HostGameProps) => hostGame(props)
  }
}

export function useJoinGame() {
  const joinGame = useAction(api.host.joinGame);

  return {
    execute: (props: { hostId: GenericId<"players">; password: string; playerId: GenericId<"players">; }) => joinGame(props)
  }
}

interface StoreUserProps {
  name?: string;
  secret1?: string;
  secret2?: string;
  secret3?: string;
  secret4?: string;
  secret5?: string;
  background: string;
  profilePicture: string;
}
export function useStoreUser() {
  const storeUser = useMutation(api.player.storePlayer);

  const createUser = async (props: StoreUserProps) => {
    storeUser({
      name: props.name,
      secret1: props.secret1 ?? "",
      secret2: props.secret2 ?? "",
      secret3: props.secret3 ?? "",
      secret4: props.secret4 ?? "",
      secret5: props.secret5 ?? "",
      background: props.background,
      profilePicture: props.profilePicture,
    })
  }

  return createUser
}


export function useUpdateReadyStatus(id: Id<"playersStatus">) {
  const updateReadyStatus = useMutation(api.host.updatePlayerReadyStatus,);

  return (ready: boolean) => updateReadyStatus({ id, ready })

}