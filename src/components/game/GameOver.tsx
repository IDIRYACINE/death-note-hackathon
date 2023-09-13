import { useReadStoreGameMonument } from "@/hooks/useGame"
import CloseCircleFilled from "@ant-design/icons/lib/icons/CloseCircleFilled"
import CrownFilled from "@ant-design/icons/lib/icons/CrownFilled"
import { Card, Col, Divider, Row, Space, Typography } from "antd"
import { useTranslation } from "next-i18next"
import { PlayerHeader, SuspicionStatus } from "./PlayersTurnBar"


export default function GameOver() {
    const { lawlietWon, kiraWon, kira, lawliet, players } = useReadStoreGameMonument()
    const { t } = useTranslation()

    return (
        <Space direction="vertical">
            <Typography.Title level={2}>{t("winner_faction")} {t(kiraWon ? "kira" : "lawliet")}</Typography.Title>
            <Space>
                <PlayerCard name={kira.player.name} avatar={kira.player.profilePicture}
                    kiraMeter={kira.kiraMeter} lawlietMeter={kira.lawlietMeter}
                    isLorKira={true} won={kiraWon} />

                <PlayerCard name={lawliet.player.name} avatar={lawliet.player.profilePicture}
                    kiraMeter={lawliet.kiraMeter} lawlietMeter={lawliet.lawlietMeter}
                    isLorKira={true} won={lawlietWon} />
            </Space>
            <Divider />
            <Row>
                {
                    players.map((player) => {
                        return (
                            <Col key={player._id}>
                                <PlayerCard 
                                    name={player.player.name} avatar={player.player.profilePicture}
                                    kiraMeter={player.kiraMeter} lawlietMeter={player.lawlietMeter}
                                    isLorKira={false} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Space>
    )
}


interface PlayerCardProps {
    name: string,
    avatar: string,
    kiraMeter: number,
    lawlietMeter: number,
    isLorKira: boolean
    won?: boolean
}
function PlayerCard(props: PlayerCardProps) {
    const { name, avatar, kiraMeter, lawlietMeter, won, isLorKira } = props

    const trailing = isLorKira ? won ? <CrownFilled /> : <CloseCircleFilled /> : undefined
    return (
        <Card className="w-60" title={<PlayerHeader name={name} avatar={avatar} trailing={trailing} />}>
            <SuspicionStatus kiraMeter={kiraMeter} lawlietMeter={lawlietMeter} kiraLabel={"K"} lawlietLabel={"L"} />
        </Card>
    )
}