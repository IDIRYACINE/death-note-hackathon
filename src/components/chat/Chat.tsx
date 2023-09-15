import { useReadStoreGame } from "@/hooks/useGame";
import { useReadStoreProfile } from "@/hooks/useProfile";
import { Layout, Card } from "antd";
import { useTranslation } from "next-i18next";
import ChatMessages from "./ChatMessages";
import SendMessageButton from "./SendMessageButton";


export default function Chat() {
    const { t } = useTranslation()

    const game = useReadStoreGame()
    const profile = useReadStoreProfile()

    const sendMessageProps = {
        kiraId: game.kiraId,
        lawlietId: game.lawlietId,
        playerId: profile.tokenIdentifier,
        round: game.round,
        sendLabel: t("send"),
        sendKiraLabel: t("sendKira"),
        sendLawlietLabel: t("sendLawliet"),
        gameId: game._id,
        avatar: profile.profilePicture,
        name: profile.name,
    }

    return (

        <Layout className="max-w-lg">
            <Layout.Content>
                <Card bodyStyle={{ padding: "0.3rem", }}>
                    <ChatMessages round={game.round} gameId={game._id} />
                </Card>

            </Layout.Content>

            <Layout.Footer className="p-0 pt-2">
                <SendMessageButton {...sendMessageProps} />
            </Layout.Footer>
        </Layout>

    )
}
