import ConvexClientProvider from '@/components/ConvexClientProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import { ConfigProvider } from 'antd';
import theme from '@/theme/ThemeConfig';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConvexClientProvider>
      <ConfigProvider theme={theme}>
        <Component {...pageProps} />
      </ConfigProvider>
    </ConvexClientProvider>
  )
}
