import { useNavigation,useChangeLanguage } from "@/hooks/useNavigate";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectThemeMode } from "@/stores/settings/selectors";
import { toggleTheme } from "@/stores/settings/settings-slice";
import { Button, Card, Layout, Select, Space, Typography } from "antd";
import { useTranslation } from "next-i18next";


export default function Settings() {
    const { t } = useTranslation()
    const navigation = useNavigation()
    const changeLanguage = useChangeLanguage()

    const dispatch = useAppDispatch()
    const isDarkTheme = useAppSelector(selectThemeMode)

    const supportedLanguages = [
        { value: 'en', label: t("english") },
        { value: 'fr', label: t("french") },
    ]

    const handleToggleTheme = () => {
        dispatch(toggleTheme())
    }

    const handleLanguageChange = (locale: string) => {
        changeLanguage(locale as "fr" | "en")
    }
    return (
        <Layout className="w-full h-screen">
            <Layout.Sider className="w-full ">
                <Card className="h-full flex flex-col items-center justify-center">
                    <Button className="w-full" htmlType="button" onClick={navigation.navigateMainMenu}>
                        {t("mainMenu")}
                    </Button>
                </Card>
            </Layout.Sider>
            <Layout.Content className="p-4">
                <Space direction="vertical">
                    <Card>

                        <Space align="center">
                            <Typography.Title level={4}>{t(isDarkTheme ? "dark_theme" : "light_theme")} : </Typography.Title>
                            <Button size="large" onClick={handleToggleTheme}>{t("swap_theme")}</Button>
                        </Space>
                    </Card>
                    <Card>

                        <Space align="center">
                            <Typography.Title level={4}>{t("language")}: </Typography.Title>
                            <Select
                                defaultValue="en"
                                style={{ width: 120 }}
                                onChange={handleLanguageChange}
                                options={supportedLanguages}
                            />
                        </Space>
                    </Card>
                </Space>

            </Layout.Content>

        </Layout>
    )
}

