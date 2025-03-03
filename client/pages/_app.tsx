import { Global, css } from '@emotion/react';
import type { AppProps } from 'next/app';
import GNB from '../components/GNB';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MOJ</title>
      </Head>
      <Global
        styles={css`
          body,
          html {
            margin: 0;
            // 너 고정.
            height: 100%;
          }

          #__next {
            height: 100%;
          }
        `}
      />
      <GNB />
      <Component {...pageProps} />
    </>
  );
}
