import { useReadStoreLobby, useReadStoreLobbyPlayers } from "@/hooks/useLobby";
import { Card } from "antd";
import { useTranslation } from "next-i18next";
import LobbyPlayers from "./LobbyPlayers";





export default function Lobby() {
    const {t} = useTranslation()

    const players = useReadStoreLobbyPlayers()
    const lobby = useReadStoreLobby()

    return (
        <Card title = {t('lobby')}>
            <LobbyPlayers players={players} />
        </Card>
    )
}