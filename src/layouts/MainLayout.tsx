import ConvexClientProvider from "@/components/ConvexClientProvider";
import { Auth0Provider } from "@auth0/auth0-react";
import { ConfigProvider } from "antd";
import theme from '@/theme/ThemeConfig';
import { ReactNode } from "react";
import { useRouter } from "next/router";

export default function MainLayout({ children }: { children: ReactNode }) {
    const router = useRouter();

    const redirectUri = router.asPath
    return (
        <Auth0Provider
            domain={process.env.AUTH0_ISSUER_BASE_URL!}
            clientId={process.env.AUTH0_CLIENT_ID!}
           
            useRefreshTokens={true}
            cacheLocation="localstorage"
        >
            <ConvexClientProvider>
                <ConfigProvider theme={theme}>
                    {children}
                </ConfigProvider>
            </ConvexClientProvider>
        </Auth0Provider>
    )
}