import { kiraAvatar, lawlietAvatar } from "@/domain/constants"
import { useReadStoreIsKiraOrLawliet, useReadStoreRound } from "@/hooks/useGame"
import { useReadStoreLobbyPlayers } from "@/hooks/useLobby"
import { Avatar, Collapse, CollapseProps, Space, Typography } from "antd"
import { useTranslation } from "next-i18next"




export default function Secrets() {
    const { isKira, isLawliet, kiraId, lawlietId } = useReadStoreIsKiraOrLawliet()
    const round = useReadStoreRound()
    const lobbyPlayers = useReadStoreLobbyPlayers()
    const { t } = useTranslation()

    const renderSecrets = isKira || isLawliet

    const secrets: CollapseProps['items'] = []
    const items: CollapseProps['items'] = []

    const targetPlayerId = isKira ? lawlietId : isLawliet ? kiraId : null

    if (targetPlayerId) {
        const targetPlayer = lobbyPlayers.find((player) => player.player.tokenIdentifier === targetPlayerId)!
        for (let i = 1; i < round + 1; i++) {
            secrets.push({
                key: `secret-${i}`,
                label: <Typography.Title level={4}>{`${t('secret')} ${i}`}</Typography.Title>,
                children: <Typography.Paragraph>{targetPlayer[`secret${i}` as keyof typeof targetPlayer] as string}</Typography.Paragraph>,
            })
        }

        const secretsHeaderProps = {
            name: t(isKira ? 'lawliet' : 'kira'),
            avatar: isKira? kiraAvatar : lawlietAvatar
        }
       

        items.push({
            key: `secretsWidget`,
            label: <SecretsHeader {...secretsHeaderProps}/>,
            children: <Collapse items={secrets} expandIconPosition="end" />
        })
    }

    return (
        renderSecrets ? <Collapse items={items} expandIconPosition="end"/> : null
    )
    
}

interface SecretsHeaderProps {
    name: string,
    avatar: string
}

function SecretsHeader({ name, avatar }: SecretsHeaderProps) {

    return (
        <Space>
            <Avatar src={avatar} />
            <Typography.Title level={4}>{name}</Typography.Title>

        </Space>
    )
}