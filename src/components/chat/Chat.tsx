import { useReadStoreGame } from "@/hooks/useGame";
import { useReadStoreLobby } from "@/hooks/useLobby";
import { useReadStoreProfile } from "@/hooks/useProfile";
import { Button, Input, Layout, Space } from "antd";
import { useTranslation } from "next-i18next";
import { useRef } from "react";


export default function Chat(){
    const {t} = useTranslation()

    const game = useReadStoreGame()
    const profile = useReadStoreProfile()

    const sendMessageProps={
        kiraId: game.kiraId,
        lawlietId: game.lawlietId,
        playerId: profile.tokenIdentifier,
        round: game.round,
        sendLabel: t("send"),
        sendKiraLabel: t("sendKira"),
        sendLawlietLabel: t("sendLawliet"),
    }

    return (
        <>
            <Layout>
                <Layout.Content>

                </Layout.Content>

                <Layout.Footer>
                    <SendMessageButton {...sendMessageProps}/>
                </Layout.Footer>
            </Layout>
        </>
    )
}

interface SendMessageButtonProps {
    kiraId?: string
    lawlietId?: string
    playerId : string,
    sendLabel: string,
    round: number,
    sendKiraLabel: string,
    sendLawlietLabel: string,
}
function SendMessageButton(props:SendMessageButtonProps){
    const {kiraId, lawlietId, playerId, sendLabel, sendKiraLabel, sendLawlietLabel} = props
    const message = useRef("")

    const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        message.current = e.target.value
    }
    
    const sendPlayerMessage = () => {
        message.current = ""
    }

    const sendKorLMessage = () => {
        message.current = ""
    }

    let kOrLbutton = null

    kOrLbutton = kiraId === playerId ? <Button title={sendKiraLabel} onClick={sendKorLMessage}/> : kOrLbutton
    kOrLbutton = lawlietId === playerId ? <Button title={sendLawlietLabel} onClick={sendKorLMessage}/> : kOrLbutton

    return (
        <Space>
            <Input.TextArea  onChange={handleMessage}/>
            <Button title={sendLabel}  onClick={sendPlayerMessage}/>
            {kOrLbutton}
        </Space>
    )
}