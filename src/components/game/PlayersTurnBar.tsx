import { fallbackImageUrl } from "@/domain/constants"
import { useReadStoreLobbyPlayers } from "@/hooks/useLobby"
import { Doc } from "@convex/_generated/dataModel"
import { Card, Space, Image, Slider, Typography } from "antd"
import { SliderMarks } from "antd/es/slider"
import { useTranslation } from "next-i18next"


export default function PlayersTurnBar() {

    const players = useReadStoreLobbyPlayers()
    const {t} = useTranslation()

    return (
        <Space direction="vertical">
            {players.map((player) => {
                const playerProps = {
                    player,
                    kiraLabel:t("kira") ,
                    lawlietLabel:t("lawliet")
                }
                return <PlayerCard key={player.playerId} {...playerProps} />
            })
            }
        </Space>
    )
}


interface PlayerCardProps{ player: Doc<"playersStatus">,kiraLabel:string,lawlietLabel:string }
function PlayerCard({ player,kiraLabel,lawlietLabel }: PlayerCardProps) {
    
    return (
        <Card>
            <Card.Grid >
                <Image
                    width={200}
                    height={200}
                    alt={player.player.name}
                    src={player.player.profilePicture}
                    fallback={fallbackImageUrl}
                />
            </Card.Grid>
            <Card.Grid style={{ textAlign: "center" }}>
                <Space>
                    <Typography.Title level={4}>{player.player.name}</Typography.Title>
                    <SuspicionMeter label={kiraLabel} step={player.kiraMeter} />
                    <SuspicionMeter label={lawlietLabel} step={player.lawlietMeter} />
                </Space>
            </Card.Grid>

        </Card>
    )
}

function SuspicionMeter({ label, step }: { label: string, step: number }) {

    const marks: SliderMarks = {
        0: '0%',
        50: '50%',
        80: '80%',
        100: {
            style: {
                color: '#f50',
            },
            label: <strong>{label}</strong>,
        },
    };
    return (
        <Slider marks={marks} step={step} disabled/>
    )
}