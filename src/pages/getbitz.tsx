import GetBitzView from 'components/GetBitz';
import type { NextPage } from 'next';
import Head from 'next/head';

const GetBitz: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Get Bitz</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <GetBitzView />
    </div>
  );
};

export default GetBitz;
