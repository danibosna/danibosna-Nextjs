import '@styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';
import MenuContext from '@context/MenuContext';
import useViewMenu from '@hooks/useViewMenu';
import MainLayout from 'layout/MainLayout';

function MyApp({ Component, pageProps, titleHead, descriptionHead }) {
  const viewMenu = useViewMenu();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>{titleHead}</title>
        <meta name="description" content={descriptionHead} />
      </Head>
      <Script strategy="afterInteractive" async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <Script strategy="afterInteractive" async id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
      `}
      </Script>
      <Script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1" />
      <MenuContext.Provider value={viewMenu}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </MenuContext.Provider>
    </>
  );
}
MyApp.defaultProps = {
  titleHead: 'DaniBosna',
  descriptionHead: 'Digital Portfolio',
};

export default MyApp;