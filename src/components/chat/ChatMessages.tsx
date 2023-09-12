import { useReadStoreChat } from "@/hooks/useChat";
import ChatInjector from "@/lib/stateLoaders/ChatLoader";
import StateLoader from "@/lib/stateLoaders/StateLoader";
import { Avatar, List } from "antd";


export default function ChatMessages({round,gameId}:{round: number,gameId:string}) {
    const data = useReadStoreChat(round)

    return (
        <>
        <StateLoader injector={<ChatInjector round={round} gameId={gameId}/>} />
        <List
            style={{height:"50vh",overflowY:"scroll"}}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => {
                return (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<p >{item.author}</p>}
                            description={item.message}
                        />
                    </List.Item>
                )
            }}
        />
        </>
    )
}