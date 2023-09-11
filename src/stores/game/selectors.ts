import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";


export const selectGame = (state: RootState) => state.game.game;
export const selectAllRoundsChat = (state: RootState) => state.game.chat;
export const selectRound = ({round}:{round:number}) => round 

export const selectChat = createSelector(
    [selectAllRoundsChat, selectRound] ,(chat,round)=> {
        return chat[round]
    },
)