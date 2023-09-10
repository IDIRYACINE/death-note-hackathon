import { useReadStoreProfile } from "@/hooks/useProfile";
import { useUpdateReadyStatus } from "@/lib/sdk";
import { Doc } from "@convex/_generated/dataModel"
import { Button, Checkbox, Descriptions, DescriptionsProps, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useTranslation } from "next-i18next";



interface LobbyPlayersProps {
    players: Doc<"playersStatus">[],
}
export default function LobbyPlayers(props: LobbyPlayersProps) {
    const { players } = props
    const { t } = useTranslation()

    const profile = useReadStoreProfile()

    const items : DescriptionsProps['items'] = players.map((player) => {
        const isPlayer = player.playerId === profile.tokenIdentifier
        const Widget = isPlayer? MyPlayerItem : OtherPlayerItem

        return {
            key: player.playerId,
            label: player.player.name,
            children: <Widget playerStatus={player} />,
        }
    })

    const onStartGame = () => {
        
    }

    const onCancel = () => {

    }

    return (
        <Space direction="vertical">

            <Descriptions bordered items={items}/>
            
            
            <Space>
                <Button htmlType="button" onClick={onCancel}>
                    {t('cancel')}
                </Button>

                <Button type="primary" htmlType="submit">
                    {t('start_game')}
                </Button>
            </Space>

        </Space>
    )
}

interface LobbyPlayerItemProps{
    playerStatus : Doc<"playersStatus">,
}
function MyPlayerItem({playerStatus}:LobbyPlayerItemProps) {
    const updateStatus  = useUpdateReadyStatus(playerStatus._id)

    const updateReadyStatus = (e:CheckboxChangeEvent) => {
        updateStatus(e.target.checked)
    }

    return (
        <Descriptions.Item label={playerStatus.player.name}>
             <Checkbox defaultChecked={playerStatus.ready} onChange={updateReadyStatus}/>
        </Descriptions.Item>

    )
}

function OtherPlayerItem({playerStatus}:LobbyPlayerItemProps) {
    console.log("other")
    return (
        <Descriptions.Item label={playerStatus.player.name}>
             <Checkbox defaultChecked={playerStatus.ready} disabled/>
        </Descriptions.Item>
    )
}