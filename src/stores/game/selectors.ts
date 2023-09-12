import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";


export const selectGame = (state: RootState) => state.game.game;
export const selectAllRoundsChat = (state: RootState) => state.game.chat;
export const selectRound = ({round}:{round:number}) => round 
const selectVoting = (state: RootState) => state.game.game.isVoting;
export const selectRoundVotes = (state: RootState) => state.game.game.roundVotes;

export const selectIsVoting = createSelector(
    [selectGame],(game)=> {
        return {
            isVoting : game.isVoting,
            gameId : game._id
        }
    }
)

export const selectChat = createSelector(
    [selectAllRoundsChat, selectRound] ,(chat,round)=> {
        const chatRound = chat[round]
        
        return chat[round] !==undefined ? chatRound : []
    },
)