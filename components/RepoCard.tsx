import Image from 'next/image';
import Star from '../public/icon/Star.svg';
import { RepoData } from '../utils/types';

interface Props {
  repos: Array<RepoData>;
  user: string;
}

export default function RepoCard(props: Props) {
  return (
    <div>
      <p className="text-[#58A7FF] text-lg">2022-Dcard-Web-Intern-Frontend</p>
      <p className="text-sm">Homework from the 2022 Dcard Web Intern</p>
      <div className="flex flex-row justify-between items-center mt-3">
        <p className="text-sm">Typescript</p>
        <div className="flex flex-row justify-center items-center pl-56">
          <Image src={Star} alt="star" width={14} height={13} />
          <p className="pl-2">3</p>
        </div>
      </div>
    </div>
  );
}
