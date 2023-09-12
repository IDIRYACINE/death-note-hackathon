import { useSendMessage } from "@/hooks/useChat"
import { Id } from "@convex/_generated/dataModel"
import { Button, Space ,Input} from "antd"
import { useRef, useState } from "react"

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
    const [message,setMessage] = useState("")
    const sendMessage = useSendMessage()

    const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage( e.target.value)
    }
    
    const sendPlayerMessage = () => {
        sendMessage({
            message : message,
            isKira : false,
            isLawliet : false,
            round,
            gameId : gameId as Id<"games">,
            avatar  ,
            name,
        })
        setMessage("")
    }

    const sendKorLMessage = () => {
        sendMessage({
            message : message,
            isKira : kiraId === playerId,
            isLawliet : lawlietId === playerId,
            round,
            gameId : gameId as Id<"games">,
            avatar  ,
            name,
        })
        setMessage( "")
    }

    let kOrLbutton = null
    const btnClassName = "w-full"
    kOrLbutton = kiraId === playerId ? <Button className={btnClassName} onClick={sendKorLMessage}>{sendKiraLabel}</Button> : kOrLbutton
    kOrLbutton = lawlietId === playerId ? <Button className={btnClassName} onClick={sendKorLMessage}>{sendLawlietLabel}</Button>: kOrLbutton

    return (
        <Space className="w-full" direction="vertical">
            <Input.TextArea value={message} onChange={handleMessage}/>
            <Button className={btnClassName} onClick={sendPlayerMessage}>{sendLabel}</Button>
            {kOrLbutton}
        </Space>
    )
}