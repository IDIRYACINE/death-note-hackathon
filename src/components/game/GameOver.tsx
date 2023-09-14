import { useReadStoreGameMonument } from "@/hooks/useMonuments"
import MonumentsInjector from "@/lib/stateLoaders/MonumentsLoader"
import CloseCircleFilled from "@ant-design/icons/lib/icons/CloseCircleFilled"
import CrownFilled from "@ant-design/icons/lib/icons/CrownFilled"
import { Doc } from "@convex/_generated/dataModel"
import { Card, Col, Divider, Empty, Image, Row, Space, Typography } from "antd"
import { useTranslation } from "next-i18next"
import { PlayerHeader, SuspicionStatus } from "./PlayersTurnBar"


export default function GameOver() {
    const { lawlietWon, kiraWon, kira, lawliet, players, monuments, gameId } = useReadStoreGameMonument()
    const { t } = useTranslation()


    const monumentsProps = {
        monumentsLabel: t("monuments"),
        noMonumentsLabel: t("no_monuments"),
        roundLabel: t("round")
    }

    return (
        <Space direction="vertical">
            <MonumentsInjector gameId={gameId} />
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

            <GameMonuments monuments={monuments} {...monumentsProps} />
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
        <Card className="w-80" title={<PlayerHeader name={name} avatar={avatar} trailing={trailing} />}>
            <SuspicionStatus kiraMeter={kiraMeter} lawlietMeter={lawlietMeter} kiraLabel={"K"} lawlietLabel={"L"} />
        </Card>
    )
}

interface GameMonumentsProps {
    monuments: Doc<"monuments">[],
    roundLabel: string,
    noMonumentsLabel: string,
    monumentsLabel: string
}
function GameMonuments({ monuments, roundLabel, noMonumentsLabel, monumentsLabel }: GameMonumentsProps) {

    const MonumentEpic = ({ monument }: { monument: Doc<"monuments"> }) => {
        return (
            <div className="flex flex-row justify-between items-start mb-4 w-full  h-full">

                <Card title={`${roundLabel} ${monument.round}`} className="w-96 overflow-y-scroll h-100 mr-2" loading={monument.epicStory === undefined}>
                    
                    <Typography.Text>{monument.epicStory}</Typography.Text>
                </Card>

                <Card className="w-96 h-100" loading={monument.epicImageUrl === undefined} bodyStyle={{height:"100%"}}>
                    <Image alt="epic" height="100%" src={monument.epicImageUrl} />
                </Card>
            </div>

        )
    }

    const Monuments = () => {
        return (
            <div className="flex w-full h-full flex-col justify-start items-center">
                <Typography.Title level={4} >{monumentsLabel}</Typography.Title>
                {
                    monuments.map((monument) => {
                        return <MonumentEpic key={monument._id} monument={monument} />
                    })
                }
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-start items-center">

            {
                monuments.length !== 0 ? <Monuments/>: <Empty description={noMonumentsLabel} />
            }
        </div>

    )
}