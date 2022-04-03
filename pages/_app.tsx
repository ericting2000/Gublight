import '../styles/globals.sass';
import '../styles/color.sass';
import type { AppProps } from 'next/app';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const delay = 250; // in milliseconds
    let timer: ReturnType<typeof setTimeout>;
    const load = () => {
      timer = setTimeout(function () {
        NProgress.start();
      }, delay);
    };
    const stop = () => {
      clearTimeout(timer);
      NProgress.done();
    };
    Router.events.on('routeChangeStart', () => load());
    Router.events.on('routeChangeComplete', () => stop());
    Router.events.on('routeChangeError', () => stop());
  }, []);
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
