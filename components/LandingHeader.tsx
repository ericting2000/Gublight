import Image from 'next/image';
import Gublight from '../public/icon/GubLight.svg';
import Github from '../public/icon/Github.svg';
import Link from 'next/link';

export default function LandingHeader() {
  return (
    <div className="web-header bg-[#040D21] w-full h-20 ">
      <div className="container flex justify-between items-center my-0 mx-auto  h-20 px-5 sm:px-10">
        <Link href="/">
          <a className="pt-[6px]">
            <Image src={Gublight} alt="GubLight Logo" height={42} width={165} />
          </a>
        </Link>

        <a
          href="https://github.com/ericting2000/2022-Dcard-Web-Frontend-Intern-Homework"
          className="pt-[6px]"
        >
          <Image src={Github} alt="Github Logo" width={20} height={20} />
        </a>
      </div>
    </div>
  );
}
