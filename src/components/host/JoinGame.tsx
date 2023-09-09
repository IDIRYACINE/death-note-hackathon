import { Space, Card, Button, Form, Input, } from "antd";
import { useTranslation } from "next-i18next";
import { useNavigateMainMenu } from "@/lib/navigation-hooks";
import { useJoinGame } from "@/lib/sdk";


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function JoinGame() {
    const { t } = useTranslation()
    const navigation = useNavigateMainMenu()
    const joinGame = useJoinGame()

    const [form] = Form.useForm();

    const onFinish = (
        values: {
            hostPassword: string,
            gameId: string,
        }) => {
        navigation.navigateMainMenu()
    };

    const onCancel = () => {
        navigation.navigateMainMenu()
    };


    return (
        <Card title={t('join_game')} style={{ width: 600 }}>

                <Form
                    {...layout}
                    layout="horizontal"
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                >

                    <Form.Item name="gameId" label={t('game_id')} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="hostPassword" label={t('password')} rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>


                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button htmlType="button" onClick={onCancel}>
                                Cancel
                            </Button>

                            <Button type="primary" htmlType="submit">
                                Connect
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
        </Card>
    )
}