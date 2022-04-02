import Head from 'next/head';
import Header from '../components/Header';
import styles from '../styles/500.module.sass';
import Favicon from '../utils/Favicon';
export default function ErrorPage() {
  return (
    <div className="bg-[#030D22] min-h-screen">
      <Head>
        <title>GubLight: 500 Internal Server Error</title>
        <meta
          name="description"
          content="500 Internal Server Error, Please contact the Gublight developer."
        />
        <meta property="og:image" content="https://i.imgur.com/N9INTIL.png" />
        <Favicon />
      </Head>
      <div>
        <Header />
      </div>
      <div className={styles.cntanr}>
        <div className={styles.main}>
          <p className="mr-1 2xl:mr-3">500</p>
          <p className="ml-2 lg:ml-4 2xl:ml-5">Internal Server Error</p>
        </div>
        <div className={styles.desc}>
          <p>{`Please contact the developer, thank you.`}</p>
        </div>
      </div>
    </div>
  );
}
