import { useSendMessage } from "@/hooks/useChat"
import { Id } from "@convex/_generated/dataModel"
import { Button, Space ,Input} from "antd"
import { useRef } from "react"

interface SendMessageButtonProps {
    kiraId?: string
    lawlietId?: string
    playerId : string,
    sendLabel: string,
    name: string,
    avatar: string,
    round: number,
    sendKiraLabel: string,
    gameId: string,
    sendLawlietLabel: string,
}
export default function SendMessageButton(props:SendMessageButtonProps){
    const {kiraId, lawlietId, playerId, round,sendLabel, sendKiraLabel, sendLawlietLabel} = props
    const {avatar, name,gameId} = props
    const message = useRef("")
    const sendMessage = useSendMessage()

    const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        message.current = e.target.value
    }
    
    const sendPlayerMessage = () => {
        sendMessage({
            message : message.current,
            isKira : false,
            isLawliet : false,
            round,
            gameId : gameId as Id<"games">,
            avatar  ,
            name,
        })
        message.current = ""
    }

    const sendKorLMessage = () => {
        sendMessage({
            message : message.current,
            isKira : kiraId === playerId,
            isLawliet : lawlietId === playerId,
            round,
            gameId : gameId as Id<"games">,
            avatar  ,
            name,
        })
        message.current = ""
    }

    let kOrLbutton = null
    const btnClassName = "w-full"
    kOrLbutton = kiraId === playerId ? <Button className={btnClassName} onClick={sendKorLMessage}>{sendKiraLabel}</Button> : kOrLbutton
    kOrLbutton = lawlietId === playerId ? <Button className={btnClassName} onClick={sendKorLMessage}>{sendLawlietLabel}</Button>: kOrLbutton

    return (
        <Space direction="vertical">
            <Input.TextArea  onChange={handleMessage}/>
            <Button className={btnClassName} onClick={sendPlayerMessage}>{sendLabel}</Button>
            {kOrLbutton}
        </Space>
    )
}