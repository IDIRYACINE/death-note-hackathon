import { useTranslation } from 'next-i18next';
import { Button, Space, Typography } from 'antd';
import { useNavigateMainMenu } from '@/lib/navigation-hooks';
import Logo from '@/components/commons/Logo';
import { useAuth0 } from '@auth0/auth0-react';


export default function MainMenu() {
    const { logout } = useAuth0();

    const { t } = useTranslation();
    const { Title } = Typography;

    const navigation = useNavigateMainMenu()

    function toLogout() {
        navigation.navigateLogout()
    }

    function toHostGame() {
        navigation.navigateHostGame()
    }

    function toJoinGame() {
        navigation.navigateJoinGame()
    }

    function toSettings() {
        navigation.navigateSettings()
    }

    function toRules() {
        navigation.navigateRules()
    }

    function toProfile() {
        navigation.navigateProfile()
    }

    return (
        <Space direction="vertical" size="small" className="flex items-center">
            <Logo />
            <Button onClick={toHostGame} className="flex flex-col justify-center items-center" type="text" size="large">
                <Title className="mb-0" level={2} type={'secondary'}>
                    {t('create_game')}
                </Title>
            </Button>
            <Button onClick={toJoinGame} className="flex flex-col justify-center items-center" type="text" size="large">
                <Title className="mb-0" level={2} type={'secondary'}>
                    {t('connect_game')}
                </Title>
            </Button>
            <Button onClick={toRules} className="flex flex-col justify-center items-center" type="text" size="large">
                <Title className="mb-0" level={2} type={'secondary'}>
                    {t('rules')}
                </Title>
            </Button>
            <Button onClick={toProfile} className="flex flex-col justify-center items-center" type="text" size="large">
                <Title className="mb-0" level={2} type={'secondary'}>
                    {t('profile')}
                </Title>
            </Button>
            <Button onClick={toSettings} className="flex flex-col justify-center items-center" type="text" size="large">
                <Title className="mb-0" level={2} type={'secondary'}>
                    {t('settings')}
                </Title>
            </Button>
            <Button onClick={toLogout} className="flex flex-col justify-center items-center" type="text" size="large">
                <Title className="mb-0" level={2} type={'secondary'}>
                    {t('logout')}
                </Title>
            </Button>
        </Space>
    )
}