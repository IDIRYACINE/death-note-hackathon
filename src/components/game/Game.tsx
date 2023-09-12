import { Layout ,Space} from "antd";
import Chat from "../chat/Chat";
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
                    <PlayersTurnBar/>
                    <Vote/>
                    <Chat/>
                </div>
            </Layout.Content>
        </Layout>
    )
}