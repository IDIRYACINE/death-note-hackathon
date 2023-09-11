
interface PlayerJoinedOptions {
    playerId: string,
    playerIds: string[],
}
export const playerAlreadyJoined = ({playerId,playerIds}: PlayerJoinedOptions) => {
    return playerIds.includes(playerId)
}

export const randomIndex = (length: number) => {
    return Math.floor(Math.random() * (length  + 1)) ;
}