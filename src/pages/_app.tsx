import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC, useEffect } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification';
import useUserBitzStore from 'stores/useUserBitzStore';
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');
require('../styles/GetBitz.css');
require('../styles/CustomRangeSlider.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Itheum Get Bitz</title>
      </Head>

      <ContextProvider>
        <div className="flex flex-col h-[100svh]">
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
