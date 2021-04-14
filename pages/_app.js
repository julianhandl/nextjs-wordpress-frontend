import Head from 'next/head'
import "../components/DesignSystem/global.scss";

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
