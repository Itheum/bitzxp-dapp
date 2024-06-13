import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { GoogleTagManager } from '@next/third-parties/google';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Explore Itheum's Bitz XP application on Solana network."
          />

          <meta content="Itheum Bitz XP" property="og:title" />
          <meta
            content="Explore the Itheum Get Bitz App & Collect XP"
            property="og:description"
          />
          <meta
            content="https://explorer.itheum.io/itheum_explorer_social_hero.png"
            property="og:image"
          />
          <meta content="Itheum Bitz XP" property="twitter:title" />
          <meta
            content="Explore the Itheum Get Bitz App & Collect XP"
            property="twitter:description"
          />
          <meta
            content="https://explorer.itheum.io/itheum_explorer_social_hero.png"
            property="twitter:image"
          />
          <meta property="og:type" content="website" />
          <meta content="summary_large_image" name="twitter:card" />

          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;500&display=swap"
            rel="stylesheet"
          />
          <GoogleTagManager gtmId="G-R4JT4ML00N" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
