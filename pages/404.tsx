import Head from 'next/head';
import Image from 'next/image';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Gublight from '../public/icon/GubLight-Logo-NoBack.svg';
import styles from '../styles/404.module.sass';
import Favicon from '../utils/Favicon';

export default function ErrorPage() {
  return (
    <div className="bg-[#030D22] ">
      <Head>
        <title>GubLight: 404 Not Found</title>
        <meta
          name="description"
          content="404 Not Found, Please contact the Gublight developer."
        />
        <meta property="og:image" content="https://i.imgur.com/GD38t2R.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gublight.com" />
        <Favicon />
      </Head>
      <div>
        <Header />
      </div>
      <div className={styles.cntanr}>
        <div className={styles.logo}>
          <p className="mr-1 2xl:mr-3">4</p>
          <div className="w-[8%]">
            <Image
              src={Gublight}
              alt="GubLight Logo No Back"
              width={83}
              height={103}
            />
          </div>
          <p className="ml-1 2xl:ml-3">4</p>
          <p className="ml-2 lg:ml-4 2xl:ml-5">Not Found</p>
        </div>
        <div className={styles.desc}>
          <p>{`This is not the page you're looking for.`}</p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
