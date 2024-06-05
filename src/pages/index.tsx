import type { NextPage } from 'next';
import Head from 'next/head';
import { HomeView } from '../views';
import GetBitzView from 'components/GetBitz';

const Home: NextPage = (props) => {
  return (
    <div className="w-[92%] md:w-[88%]">
      <Head>
        <title>Itheum Get Bitz XP</title>
      </Head>
      <GetBitzView />
    </div>
  );
};

export default Home;
