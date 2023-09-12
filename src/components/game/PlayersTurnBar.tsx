import { fallbackImageUrl } from "@/domain/constants"
import { useReadStoreLobbyPlayers } from "@/hooks/useLobby"
import { Doc } from "@convex/_generated/dataModel"
import { Card, Space, Image, Slider, Typography, CollapseProps, Avatar, Collapse } from "antd"
import { SliderMarks } from "antd/es/slider"


export default function PlayersTurnBar() {

    const players = useReadStoreLobbyPlayers()

    const items: CollapseProps['items'] = players.map((player) => {
        return {
            key: `status-${player._id}`,
            label: <PlayerHeader name={player.player.name}  avatar={player.player.profilePicture}/>,
            children: <SuspicionStatus 
            kiraMeter={player.kiraMeter} 
            lawlietMeter={player.lawlietMeter} 
            kiraLabel={"K"}
            lawlietLabel={"L"}/>,
        }
    })

    return (
        <Space direction="vertical">
            <Collapse items={items} expandIconPosition="end" />
        </Space>
    )
}


interface PlayerCardProps { player: Doc<"playersStatus">, kiraLabel: string, lawlietLabel: string }
function PlayerCard({ player, kiraLabel, lawlietLabel }: PlayerCardProps) {

    return (
        <Card>
            <Card.Grid className="flex flex-col justify-center items-center" style={{ width: "25%", padding: "0.2rem" }} >
                <Image
                    width="100%"
                    height={100}
                    alt={player.player.name}
                    src={player.player.profilePicture}
                    fallback={fallbackImageUrl}
                />
            </Card.Grid>
            <Card.Grid style={{ textAlign: "center", width: "75%", }}>
                <SuspicionStatus 
                kiraMeter={player.kiraMeter} 
                lawlietMeter={player.lawlietMeter} 
                kiraLabel={kiraLabel}
                lawlietLabel={lawlietLabel}/>
                
            </Card.Grid>

        </Card>
    )
}

interface PlayerHeaderProps{
    name : string,
    avatar : string
}
function PlayerHeader({name,avatar}:PlayerHeaderProps){
    return (
        <Space>
            <Avatar src={avatar}/>
            <Typography.Title level={4}>{name}</Typography.Title>

        </Space>
    )
}

interface SuspicionStatusProps{
    kiraMeter : number,
    lawlietMeter : number,
    kiraLabel : string,
    lawlietLabel : string
}
function SuspicionStatus({ kiraMeter, lawlietMeter,kiraLabel,lawlietLabel}: SuspicionStatusProps) {
    return (
        <Space className="w-full" direction="vertical">
            <SuspicionMeter label={kiraLabel} step={kiraMeter} />
            <SuspicionMeter label={lawlietLabel} step={lawlietMeter} />
        </Space>
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
        <Slider marks={marks} value={step} disabled />
    )
}