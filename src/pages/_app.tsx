import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import { appWithTranslation } from 'next-i18next';
import MainLayout from '@/layouts/MainLayout';

function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      
      <Component {...pageProps} />
    </MainLayout>

  )
}

export default appWithTranslation(App)
