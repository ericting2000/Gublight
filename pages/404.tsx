import Image from 'next/image';
import Header from '../components/Header';
import Gublight from '../public/icon/GubLight-Logo-NoBack.svg';
import styles from '../styles/404.module.sass';

export default function ErrorPage() {
  return (
    <div className="bg-[#030D22] min-h-screen">
      <div>
        <Header />
      </div>
      <div className={`${styles.cntanr}`}>
        <div className={`${styles.logo}`}>
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
        <div className={`${styles.desc}`}>
          <p>{`This is not the page you're looking for.`}</p>
        </div>
      </div>
    </div>
  );
}
