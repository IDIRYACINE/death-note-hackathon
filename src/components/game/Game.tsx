import { useReadStoreIsGameOver } from "@/hooks/useGame";
import { useNavigation } from "@/hooks/useNavigate";
import { Layout, Space } from "antd";
import { useEffect } from "react";
import Chat from "../chat/Chat";
import Secrets from "../secrets/Secrets";
import Vote from "../vote/Vote";
import PlayersTurnBar from "./PlayersTurnBar";
import RoundTimer from "./RoundTImer";


export default function Game(){
    const {gameOver} = useReadStoreIsGameOver()
    const navigation = useNavigation()

    useEffect(() => {
        if(gameOver){
            navigation.navigateGameOver()
        }
    },[gameOver,navigation])

    return (
        <Layout className="w-screen">
            <Layout.Header className="flex flex-row justify-center items-center">
                <RoundTimer  />
            </Layout.Header>
            <Layout.Content className="flex flex-row justify-between items-center w-full h-full p-2">
                    <Space direction="vertical" className="overflow-y-scroll h-112 w-96"  >
                        <Secrets/>
                        <PlayersTurnBar/>
                    </Space>
                    <Vote/>
                    <Chat/>
            </Layout.Content>
        </Layout>
    )
}