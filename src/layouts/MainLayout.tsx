import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ConfigProvider } from "antd";
import theme from '@/theme/ThemeConfig';
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from 'react-redux'
import { store } from "@/stores/store";

export default function MainLayout({ children }: { children: ReactNode }) {

    return (
        <Provider store={store} >
            <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
                <ConvexClientProvider>
                    <ConfigProvider theme={theme}>
                        <div
                            className='flex min-h-screen flex-col items-center justify-center p-24 bg-black'
                        >
                            {children}
                        </div>
                    </ConfigProvider>
                </ConvexClientProvider>
            </ClerkProvider>
        </Provider>

    )
}