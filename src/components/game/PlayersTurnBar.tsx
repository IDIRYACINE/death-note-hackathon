import { fallbackImageUrl } from "@/domain/constants"
import { useReadStoreAbillities } from "@/hooks/useGame"
import { useReadStoreLobbyPlayers } from "@/hooks/useLobby"
import { usePlayerAction } from "@/hooks/usePlayerActions"
import { Doc, Id } from "@convex/_generated/dataModel"
import { Card, Space, Image, Slider, Typography, CollapseProps, Avatar, Collapse, Row, Col, Button } from "antd"
import { SliderMarks } from "antd/es/slider"
import { useTranslation } from "next-i18next"


export default function PlayersTurnBar() {

    const players = useReadStoreLobbyPlayers()
    const {t} = useTranslation()

    const gadgetLabels = {
        protectLawlietLabel: t('protect_lawliet'),
        protectKiraLabel: t('protect_kira'),
        killLabel: t('kill'),
        investigateLabel: t('investigate'),
        imprisonLabel: t('imprison')
    }

    const items: CollapseProps['items'] = players.map((player) => {

        return {
            key: `status-${player._id}`,
            label: <PlayerHeader name={player.player.name} avatar={player.player.profilePicture} />,
            children:
                <Space direction="vertical">
                    <SuspicionStatus
                        kiraMeter={player.kiraMeter}
                        lawlietMeter={player.lawlietMeter}
                        kiraLabel={"K"}
                        lawlietLabel={"L"} />
                    <ActionsGadget
                        targetId={player._id}
                        kiraMeter={player.kiraMeter}
                        lawlietMeter={player.lawlietMeter}
                        {...gadgetLabels}
                        />
                </Space>

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
                    lawlietLabel={lawlietLabel} />

            </Card.Grid>

        </Card>
    )
}

interface PlayerHeaderProps {
    name: string,
    avatar: string,
    trailing?: React.ReactNode
}
export function PlayerHeader({ name, avatar,trailing }: PlayerHeaderProps) {
    return (
        <Space>
            <Avatar src={avatar} />
            <Typography.Title level={4}>{name}</Typography.Title>
            {trailing}
        </Space>
    )
}

interface SuspicionStatusProps {
    kiraMeter: number,
    lawlietMeter: number,
    kiraLabel: string,
    lawlietLabel: string
}
export function SuspicionStatus({ kiraMeter, lawlietMeter, kiraLabel, lawlietLabel }: SuspicionStatusProps) {
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

interface ActionsGadgetProps {
    targetId: Id<"playersStatus">,
    kiraMeter: number,
    lawlietMeter: number,
    protectLawlietLabel: string,
    protectKiraLabel: string,
    investigateLabel: string,
    imprisonLabel: string,
    killLabel: string,
}
function ActionsGadget(props: ActionsGadgetProps) {
    const { isKira, isNeutral, actionsCount,userId, } = useReadStoreAbillities()

    const { targetId,kiraMeter,lawlietMeter } = props
    const {killLabel,investigateLabel,imprisonLabel,protectKiraLabel,protectLawlietLabel} = props

    const disabled = (actionsCount === 0) || (userId === targetId)

    const actions = usePlayerAction()
    
    const investigate = () => actions.investigate({targetId,userId})

    const KiraActions = () => {
        const canIvestigateL = !disabled && lawlietMeter >= 70
        const canKillL = !disabled && lawlietMeter >= 90

        const kill = () => actions.kill({targetId, userId})

        return (
            <Space>
                <Button onClick={investigate} disabled={!canIvestigateL}>{investigateLabel}</Button>
                <Button onClick={kill} disabled={!canKillL}>{killLabel}</Button>

            </Space>
        )
    }

    const LawlietActions = () => {
        const canIvestigateK = !disabled && kiraMeter >= 70
        const canImprisonK = !disabled && kiraMeter >= 90

        const imprison = () => actions.jail({targetId, userId})
        return (
            <Space>
                <Button onClick={investigate} disabled={!canIvestigateK} >{investigateLabel}</Button>
                <Button onClick={imprison} disabled={!canImprisonK}>{imprisonLabel}</Button>
            </Space>
        )
    }

    const NeutralActions = () => {
        const protectL = () => actions.protect({targetId, userId,actionType:"protectLawliet"})
        const protectK = () => actions.protect({targetId, userId,actionType:"protectKira"})
        return  (
            <Space>
                <Button onClick={protectL} disabled={disabled} >{protectLawlietLabel}</Button>
                <Button onClick={protectK} disabled={disabled}>{protectKiraLabel}</Button>
            </Space>
        )
    }

    return (isNeutral ? <NeutralActions /> : isKira ? <KiraActions /> : <LawlietActions />)
}