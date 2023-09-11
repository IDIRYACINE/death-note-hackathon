import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useAction, useQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "@convex/_generated/api";
import { loadChat, loadGame } from "@/stores/game/game-slice";
import { selectChat, selectGame } from "@/stores/game/selectors";
import { Id } from "@convex/_generated/dataModel";
import { useNavigation } from "./useNavigate";


export const useStartGame = () => {
    const startGame = useAction(api.game.startGame)
    const navigate = useNavigation()

    return (lobbyId: string) => {

        startGame({ lobbyId:lobbyId as Id<"lobbies"> }).then((res) => navigate.navigateGame(lobbyId))
    }
}

export const useTearDownGame = () => {
    const tearDown = useAction(api.game.endGame)
    const navigate = useNavigation()

    return (props: { gameId?: Id<"games">, tokenIdentifier:string,hostId: string, lobbyId: Id<"lobbies"> }) => {
        if(props.hostId !== props.tokenIdentifier) {
            navigate.navigateMainMenu()
            return
        }
        const tearDownProps = {gameId: props.gameId, lobbyId: props.lobbyId,hostId: props.hostId}
        tearDown({ ...tearDownProps }).then(() => navigate.navigateMainMenu())
    }
}

export const useLoadGame = (lobbyId: Id<"lobbies">) => {

    const game = useQuery(api.game.loadGame, { lobbyId })
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (game) {
            dispatch(loadGame(game))
        }
    }, [dispatch, game])

    return game !== null && game !== undefined
}

export const useLoadRoundMessages = (round: number, gameId: Id<"games">) => {
    const chat = useQuery(api.chat.loadRoundMessages, { round, gameId })

    const dispatch = useAppDispatch()


    useEffect(() => {
        if (chat) {
            dispatch(loadChat(chat))
        }
    }, [dispatch, chat])

}

export const useReadStoreGame = () => {
    const game = useAppSelector(selectGame)
    return game

}

export const useReadStoreChat = (round: number) => {
    const chat = useAppSelector((state) => selectChat({ ...state, round }))
    return chat
}