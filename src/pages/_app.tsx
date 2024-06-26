import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC, useEffect } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification';
import { GoogleTagManager } from '@next/third-parties/google';
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');
require('../styles/GetBitz.css');
require('../styles/CustomRangeSlider.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Itheum Bitz XPP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ContextProvider>
        <GoogleTagManager gtmId="G-R4JT4ML00N" />
        <div className="flex flex-col flex-auto min-h-[100dvh]">
          <Notifications />
          <AppBar />
          <ContentContainer>
            <Component {...pageProps} />
            <Footer />
          </ContentContainer>
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
