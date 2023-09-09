import ConvexClientProvider from "@/components/ConvexClientProvider";
import { Auth0Provider } from "@auth0/auth0-react";
import { ConfigProvider } from "antd";
import theme from '@/theme/ThemeConfig';
import { ReactNode } from "react";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function MainLayout({ children }: { children: ReactNode }) {

    return (
        <UserProvider
            
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
        </UserProvider>
    )
}