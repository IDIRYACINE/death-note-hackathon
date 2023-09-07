import { useTranslation } from 'next-i18next';
import { Button, Space, Typography } from 'antd';
import { useNavigateGame } from '@/lib/navigation-hooks';

import Logo from '@/components/commons/Logo';

export default function StartScreen() {

    const { t } = useTranslation();
    const { Title } = Typography;

    const navigation = useNavigateGame()

    function navigate(){
        navigation.navigate()
    }


    return (
        <Space direction="vertical" size="small" className="flex items-center">
            <Logo />
            <Button onClick={navigate} className="flex flex-col justify-center items-center" type="text" size="large">
                <Title className="blink mb-0" level={2} type={'secondary'}>
                    {t('start_game')}
                </Title>
            </Button>
        </Space>
    )
}