import Image from 'next/image';
import Header from '../components/Header';
import Gublight from '../public/assets/icon/GubLight-Logo-NoBack.svg';

export default function ErrorPage() {
  return (
    <div className="bg-[#030D22] min-h-screen">
      <div>
        <Header />
      </div>
      <div className="container flex  justify-center items-center mt-20 mx-auto px-10 pb-20 2xl:pb-32">
        <div>
          <Image
            src={Gublight}
            alt="GubLight Logo No Back"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}
