import ConvexClientProvider from "@/components/ConvexClientProvider";
import { Auth0Provider } from "@auth0/auth0-react";
import { ConfigProvider } from "antd";
import theme from '@/theme/ThemeConfig';
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {

    return (
        <Auth0Provider
            domain={process.env.AUTH0_ISSUER_BASE_URL!}
            clientId={process.env.AUTH0_CLIENT_ID!}

            useRefreshTokens={true}
            cacheLocation="localstorage"
        >
            <ConvexClientProvider>
                <ConfigProvider theme={theme}>
                    <div
                        className='flex min-h-screen flex-col items-center justify-center p-24 bg-black'
                    >
                        {children}
                    </div>

                </ConfigProvider>
            </ConvexClientProvider>
        </Auth0Provider>
    )
}