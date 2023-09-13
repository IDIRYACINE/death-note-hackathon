import { useReadStoreIsVoting, useReadStoreKandLids } from "@/hooks/useGame"
import { useReadStoreLobbyPlayers } from "@/hooks/useLobby"
import { useReadStorePlayerId } from "@/hooks/useProfile"
import { useVote } from "@/hooks/useVote"
import SmileOutlined from "@ant-design/icons/lib/icons/SmileOutlined"
import { Doc } from "@convex/_generated/dataModel"
import { Avatar, Button,Typography, Col, Row, Space } from "antd"
import { useTranslation } from "next-i18next"
import { useState } from "react"


export default function Vote() {
    const { isVoting, gameId, } = useReadStoreIsVoting()
    const playerId = useReadStorePlayerId()
    const { t } = useTranslation()


    const activePhaseProps = {
        kiraLabel: t("kira"),
        lawlietLabel: t("lawliet"),
        voteLabel: t("vote"),
        gameId,
        playerId
    }
    const inactivePhaseProps = {
        notVotingPhaseLabel: t("not_voting_phase"),
    }

    return (
        <div className="flex flex-row justify-center items-center w-full max-w-md">

            {isVoting ? <VotingPhaseActive {...activePhaseProps} /> : <VotingPhaseInactive {...inactivePhaseProps} />
            }
        </div>


    )
}

interface VotingPhaseActiveProps {
    kiraLabel: string
    lawlietLabel: string
    voteLabel: string,
    gameId: string,
    playerId: string,
}
function VotingPhaseActive(props: VotingPhaseActiveProps) {
    const { kiraLabel, lawlietLabel, voteLabel } = props
    const { gameId, playerId } = props
    const [isKira, setIsKira] = useState(false)
    const [targetPlayerId, setTargetPlayerId] = useState("")
    const vote = useVote()
    const {kiraStatusId, lawlietStatusId} = useReadStoreKandLids()

    const lobbyPlayers = useReadStoreLobbyPlayers()

    const isVotingKira = () => {
        setIsKira(true)
    }

    const isVotingLawliet = () => {
        setIsKira(false)
    }

    const handleVote = () => {
        vote({
            gameId: gameId,
            playerId: playerId,
            targetStatusId: targetPlayerId,
            voteType: isKira ? "kira" : "lawliet",
            isKiraOrL: false,
            kiraStatusId,
            lawlietStatusId
        })
    }

    const buttonType = (kOrLbutton: "kira" | "lawliet") => {
        if (isKira && kOrLbutton === "kira") return "primary"
        if (!isKira && kOrLbutton === "lawliet") return "primary"
        return "default"
    }


    const PlayerButton = ({ player }: { player: Doc<"playersStatus"> }) => {
        const isSelected = player._id === targetPlayerId

        const select = () => {
            setTargetPlayerId(player._id)
        }

        const type = isSelected ? "primary" : "default"
        return (
            <Col className="gutter-row" >
                <Button className="flex flex-col justify-evenly items-center h-fit" type={type} onClick={select}

                    icon={<Avatar size="large" src={player.player.profilePicture} />}
                >
                    <p>{player.player.name}</p>
                </Button>


            </Col>
        )
    }

    return (
        <Space direction="vertical">
            <Space>
                <Button type={buttonType("kira")} onClick={isVotingKira}>{kiraLabel}</Button>
                <Button type={buttonType("lawliet")} onClick={isVotingLawliet}>{lawlietLabel}</Button>
            </Space>

            <Row gutter={[16, 24]}>
                {lobbyPlayers.map((lobbyPlayer) => {
                    const key = `voting-${lobbyPlayer._id}}`
                    return <PlayerButton key={key} player={lobbyPlayer} />
                })}
            </Row>

            <Button className="w-full" onClick={handleVote} type="primary" >
                {voteLabel}
            </Button>
        </Space>
    )
}

interface VotingPhaseInactiveProps {
    notVotingPhaseLabel: string
}
function VotingPhaseInactive({ notVotingPhaseLabel }: VotingPhaseInactiveProps) {
    return (
        <Space direction="vertical">
            <SmileOutlined style={{ fontSize: 20 }} />
            <Typography.Title level={4}>{notVotingPhaseLabel}</Typography.Title>

        </Space>
    )
}