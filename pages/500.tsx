import Image from 'next/image';
import Header from '../components/Header';
import Gublight from '../public/icon/GubLight-Logo-NoBack.svg';

export default function ErrorPage() {
  return (
    <div className="bg-[#030D22] min-h-screen">
      <div>
        <Header />
      </div>
      <div className="container flex flex-col  justify-center items-center mt-44 mx-auto px-10 pb-20 2xl:pb-32">
        <div className="flex-wrap flex justify-center items-center text-white text-3xl sm:text-6xl lg:text-[70pt] 2xl:text-[90pt]">
          <p className="mr-1 2xl:mr-3">500</p>
          <p className="ml-2 lg:ml-4 2xl:ml-5">Internal Sever Error</p>
        </div>
        <div className="text-white sm:text-3xl lg:text-5xl 2xl:text-6xl sm:mt-4 ">
          <p>{`Please contact the developer, thank you.`}</p>
        </div>
      </div>
    </div>
  );
}
