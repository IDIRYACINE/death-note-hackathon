import { Layout ,Space} from "antd";
import Chat from "../chat/Chat";
import PlayersTurnBar from "./PlayersTurnBar";


export default function Game(){
    return (
        <Layout className="w-screen">
            <Layout.Header className="flex flex-row justify-center items-center">
                Round 1 : 00:40
            </Layout.Header>
            <Layout.Content className="flex flex-row justify-center items-center">
                <Space>
                    <PlayersTurnBar/>
                    <div>Something Something</div>
                    <Chat/>
                </Space>
            </Layout.Content>
        </Layout>
    )
}