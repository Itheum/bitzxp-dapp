import GetBitzView from 'components/GetBitz';
import type { NextPage } from 'next';
import Head from 'next/head';

const GetBitz: NextPage = (props) => {
  return (
    <div className="w-[92%] md:w-[72%]">
      <Head>
        <title>Get Bitz</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <GetBitzView />
    </div>
  );
};

export default GetBitz;
