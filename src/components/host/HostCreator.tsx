import { Space, Card, Descriptions, Button, Form, Input, Select, } from "antd";
import { useTranslation } from "next-i18next";
import type { DescriptionsProps } from "antd"
import { useNavigateMainMenu } from "@/lib/navigation-hooks";
import { useHostGame } from "@/lib/sdk";
import { useReadStoreProfile } from "@/hooks/useProfile";

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function HostCreator() {
    const { t } = useTranslation()
    const profile = useReadStoreProfile()
    const navigation = useNavigateMainMenu()
    const hostGame = useHostGame()

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: t('host_master'),
            children: <p>{profile.name ?? "nothing"}</p>,
        },
    ]

    const [form] = Form.useForm();

    const onFinish = (
        values: {
            hostPassword: string,
            maxPlayerCount: string,
            turnTimerInSeconds: string
        }) => {

        hostGame.execute(
            {
                password: values.hostPassword,
                maxPlayers: parseInt(values.maxPlayerCount),
                turnTimerInSeconds: parseInt(values.turnTimerInSeconds),
                hostId: profile.tokenIdentifier
            }
        ).then((lobbyId) => {
            navigation.navigateLobby(lobbyId)
        })

    };

    const onCancel = () => {
        navigation.navigateMainMenu()
    };


    return (
        <Card title={t('host_settings')} style={{ width: 600 }}>
            <Space direction="vertical">
                <Descriptions items={items} />

                <Form
                    {...layout}
                    layout="vertical"
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                >
                    <Form.Item name="hostPassword" label={t('password')} rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="maxPlayerCount" label={t('max_players')} rules={[{ required: true }]}>
                        <Select
                            placeholder="Max players count"
                            allowClear
                        >
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="turnTimerInSeconds" label={t('turn_timer')} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button htmlType="button" onClick={onCancel}>
                                {t('cancel')}
                            </Button>

                            <Button type="primary" htmlType="submit">
                                {t('create_game')}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Space>
        </Card>
    )
}