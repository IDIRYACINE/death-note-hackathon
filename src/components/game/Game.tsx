import { useReadStoreIsGameOver } from "@/hooks/useGame";
import { useNavigation } from "@/hooks/useNavigate";
import { Layout, Space, theme } from "antd";
import { useEffect } from "react";
import Chat from "../chat/Chat";
import Secrets from "../secrets/Secrets";
import Vote from "../vote/Vote";
import PlayersTurnBar from "./PlayersTurnBar";
import RoundTimer from "./RoundTimer";
import { useFeedbackModal } from "@/hooks/useNavigate"


export default function Game() {
    const { gameOver } = useReadStoreIsGameOver()
    const navigation = useNavigation()
    const { contextHolder, display: displayFeedback } = useFeedbackModal()
    const {
        token: { colorBgContainer },
      } = theme.useToken();
      
    useEffect(() => {
        if (gameOver) {
            navigation.navigateGameOver()
        }
    }, [gameOver, navigation])

    return (
        <Layout className="w-screen">
            <Layout.Header className="flex flex-row justify-center items-center p-0">
                <RoundTimer />
            </Layout.Header>

            <Layout.Content >
                <Layout>
                    <Layout.Sider className="pt-2" width="fit-content" style={{ background: colorBgContainer }} >
                        <Space direction="vertical"  className="overflow-y-scroll h-112 w-96"   >
                            <Secrets />
                            <PlayersTurnBar onActionResult={displayFeedback} />
                        </Space>

                    </Layout.Sider>
                    <Layout.Content className="flex flex-row justify-evenly items-center w-full h-full p-2">
                        <Vote onActionResult={displayFeedback} />
                        <Chat />
                    </Layout.Content>
                </Layout>

            </Layout.Content>
            {contextHolder}
        </Layout>
    )
}