import { Doc } from "../_generated/dataModel";

interface PlayerJoinedOptions {
    playerId: string,
    playerIds: string[],
}
export const playerAlreadyJoined = ({ playerId, playerIds }: PlayerJoinedOptions) => {
    return playerIds.includes(playerId)
}

export const randomIndex = (length: number) => {
    return Math.floor(Math.random() * (length + 1));
}

interface Vote {
    voteImpact: number, voteType: string, targetId: string, playerId: string
}
export const alreadyVoted = (playerId: string, roundVotes: Vote[]) => {
    roundVotes.forEach((vote) => {
        if (vote.playerId === playerId) {
            return true
        }
    })
    return false
}
interface GameOverOptions {
    round: number,
    roundVotes: Vote[],
    playerIds: string[],
    roundTimerInSeconds: number,
    roundStartTimestamp: number,

}
export const IsGameOver = (game:GameOverOptions) => {
    return game.round > 7
}

export const IsVotingOver = (game:GameOverOptions) => {
    return game.roundVotes.length === game.playerIds.length
}