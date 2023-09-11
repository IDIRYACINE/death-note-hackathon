import { useStartGame, useTearDownGame } from "@/hooks/useGame";
import { useReadStoreLobby, useReadStoreLobbyPlayers } from "@/hooks/useLobby";
import { useNavigation } from "@/hooks/useNavigate";
import { useReadStoreProfile } from "@/hooks/useProfile";
import { Button, Card, Descriptions, DescriptionsProps, Space } from "antd";
import { useTranslation } from "next-i18next";
import LobbyPlayers from "./LobbyPlayers";





export default function Lobby() {
    const { t } = useTranslation()

    const players = useReadStoreLobbyPlayers()
    const lobby = useReadStoreLobby()
    const startGame = useStartGame()
    const cancelGame = useTearDownGame()
    const profile = useReadStoreProfile()

    const items: DescriptionsProps['items'] = [
        {
            key: lobby._id,
            label: t("lobby_id"),
            span : 3,
            children: <p>{lobby._id}</p>,
        }
    ]


    const onStartGame = () => {
        startGame(lobby._id)
    }

    const onCancel = () => {
        cancelGame(
            {
                hostId: lobby.hostId,
                lobbyId: lobby._id,
                tokenIdentifier : profile.tokenIdentifier
            }
        )
    }

    return (
        <Card title={t('lobby')}>
            <Space direction="vertical">

                <Descriptions layout="vertical" items={items} bordered />
                <LobbyPlayers players={players} />
                <Space>
                    <Button htmlType="button" onClick={onCancel}>
                        {t('cancel')}
                    </Button>

                    <Button type="primary" onClick={onStartGame}>
                        {t('start_game')}
                    </Button>
                </Space>
            </Space>

        </Card>
    )
}