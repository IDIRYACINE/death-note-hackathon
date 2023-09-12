import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";


export const selectGame = (state: RootState) => state.game.game;
export const selectAllRoundsChat = (state: RootState) => state.game.chat;
export const selectRound = ({round}:{round:number}) => round 
export const selectRoundVotes = (state: RootState) => state.game.game.roundVotes;
const selectProfile = (state: RootState) => state.profile.profile;


export const selectIsKiraOrLawliet = createSelector(
    [selectGame,selectProfile],(game,profile)=> {
        const kiraId = game.kiraId
        const lawlietId = game.lawlietId
        const playerId = profile.tokenIdentifier

        return {
            kiraId,
            lawlietId,
            playerId,
            isKira : kiraId === playerId,
            isLawliet : lawlietId === playerId
        }
    }
)

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
