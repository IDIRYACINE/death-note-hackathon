import { Layout ,Space} from "antd";
import PlayersTurnBar from "./PlayersTurnBar";


export default function Game(){
    return (
        <Layout className="layout">
            <Layout.Header className="flex flex-row justify-center items-center">
                Round 1 : 00:40
            </Layout.Header>
            <Layout.Content className="flex flex-row justify-center items-center">
                <Space>
                    <PlayersTurnBar/>
                    <div>Something Something</div>
                    <div>Chat</div>
                </Space>
            </Layout.Content>
        </Layout>
    )
}