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

    const items: DescriptionsProps['items'] = players.map((player) => {
        const isPlayer = player.playerId === profile.tokenIdentifier
        const Widget = isPlayer ? MyPlayerItem : OtherPlayerItem

        return {
            key: player.playerId,
            label: player.player.name,
            children: <Widget playerStatus={player} />,
        }
    })

    return (

        <Descriptions bordered column={1} items={items} />




    )
}

interface LobbyPlayerItemProps {
    playerStatus: Doc<"playersStatus">,
}
function MyPlayerItem({ playerStatus }: LobbyPlayerItemProps) {
    const updateStatus = useUpdateReadyStatus(playerStatus._id)

    const updateReadyStatus = (e: CheckboxChangeEvent) => {
        updateStatus(e.target.checked)
    }

    return (
        <Descriptions.Item label={playerStatus.player.name}>
            <Checkbox defaultChecked={playerStatus.ready} onChange={updateReadyStatus} />
        </Descriptions.Item>

    )
}

function OtherPlayerItem({ playerStatus }: LobbyPlayerItemProps) {
    return (
        <Descriptions.Item label={playerStatus.player.name}>
            <Checkbox defaultChecked={playerStatus.ready} disabled />
        </Descriptions.Item>
    )
}