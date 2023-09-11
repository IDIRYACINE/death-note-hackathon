import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const databaseTables = {
    games : "games",
    players : "players",
    lobbies : "lobbies",
    publicMessages : "publicMessages",
    privateMessages : "privateMessages",
    playersStatus : "playersStatus"
}

export const PlayerSchema = {
    tokenIdentifier: v.string(),
    name: v.string(),
    secret1: v.string(),
    secret2: v.string(),
    secret3: v.string(),
    secret4: v.string(),
    secret5: v.string(),
    background: v.string(),
    profilePicture: v.string(),
}

export const PlayerStatusScehma = {
    lobbyId: v.id("lobbies"),
    playerId: v.string(),
    player: v.object(PlayerSchema),
    kiraMeter: v.number(),
    lawlietMeter: v.number(),
    ready: v.boolean(),
    name:v.optional(v.string()),

}

export const GameSchema = {
    hostId: v.string(),
    lobbyId : v.id("lobbies"),
    kiraId: v.string(),
    lawlietId: v.string(),
    turnTimerInSeconds: v.number(),
    playerTurnId: v.string(),
    playerIds: v.array(v.string()),
}

export const LobbySchema = {
    hostId: v.string(),
    password: v.string(),
    maxPlayers: v.number(),
    playersCount : v.number(),
    gameStarted: v.boolean(),
    turnTimerInSeconds: v.number(),
    playerIds: v.array(v.string()),
}

export const PrivateMessagesSchema = {
    gameId: v.id(databaseTables.games),
    senderId: v.string(),
    receiverId: v.string(),
    message: v.string(),
    author: v.string()
}

export const PublicMessagesSchema = {
    gameId: v.id(databaseTables.games),
    message: v.string(),
    author: v.string(),
    senderId: v.string(),
}












const lobbies = defineTable(LobbySchema).index("by_hostId", ["hostId"]);
const games = defineTable(GameSchema).index("by_hostId", ["hostId"]);
const players = defineTable(PlayerSchema).index("by_token", ["tokenIdentifier"]);
const publicMessages = defineTable(PublicMessagesSchema).index("by_gameId", ["gameId"]);
const privateMessages = defineTable(PrivateMessagesSchema).index("by_gameId_senderId_receiverId", ["gameId","senderId","receiverId"]);
const playersStatus = defineTable(PlayerStatusScehma).index("by_lobbyId_playerId", ["lobbyId","playerId"]);

export default defineSchema({
    players,
    publicMessages,
    privateMessages,
    lobbies,
    games,
    playersStatus,
});