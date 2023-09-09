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

const PlayerSchema = {
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

const PlayerStatusScehma = {
    lobbyId: v.id(databaseTables.lobbies),
    playerId: v.id(databaseTables.players),
    kiraMeter: v.number(),
    lawlietMeter: v.number(),
    ready: v.boolean()

}

const GameSchema = {
    hostId: v.id(databaseTables.players),
    lobybId : v.id(databaseTables.lobbies),
    players: v.array(v.object(PlayerSchema)),
    kiraId: v.id(databaseTables.players),
    lawlietId: v.id(databaseTables.players),
    turnTimerInSeconds: v.number(),
    playerTurnId: v.id(databaseTables.players),
}

const LobbySchema = {
    hostId: v.id(databaseTables.players),
    password: v.string(),
    maxPlayers: v.number(),
    playersCount : v.number(),
    gameStarted: v.boolean(),
    turnTimerInSeconds: v.number(),
}

const PrivateMessagesSchema = {
    gameId: v.id(databaseTables.games),
    senderId: v.id(databaseTables.players),
    receiverId: v.id(databaseTables.players),
    message: v.string(),
    author: v.string()
}

export const PublicMessagesSchema = {
    gameId: v.id(databaseTables.games),
    message: v.string(),
    author: v.string(),
    senderId: v.id(databaseTables.players)
}












const lobbies = defineTable(LobbySchema).index("by_hostId", ["hostId"]);
const games = defineTable(GameSchema);
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