import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import { appWithTranslation } from 'next-i18next';
import MainLayout from '@/layouts/MainLayout';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Head>
        <title>Death Note</title>
      </Head>
      <Component {...pageProps} />
    </MainLayout>

  )
}

// export default appWithTranslation(App)
export default App
