import { Layout } from "antd";
import Chat from "../chat/Chat";
import Secrets from "../secrets/Secrets";
import Vote from "../vote/Vote";
import PlayersTurnBar from "./PlayersTurnBar";
import RoundTimer from "./RoundTImer";


export default function Game(){
    return (
        <Layout className="w-screen">
            <Layout.Header className="flex flex-row justify-center items-center">
                <RoundTimer  />
            </Layout.Header>
            <Layout.Content className="flex flex-row justify-center items-center">
                <div className="flex flex-row justify-between items-center w-full h-full p-2">
                    <div className="flex flex-col justify-start items-start">
                        <Secrets/>
                        <PlayersTurnBar/>
                    </div>
                    <Vote/>
                    <Chat/>
                </div>
            </Layout.Content>
        </Layout>
    )
}