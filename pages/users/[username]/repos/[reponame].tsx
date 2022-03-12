import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export default function Repo() {
  const router = useRouter();
  const reponame = router.query.reponame;
  return (
    <div className="container flex flex-col justify-center items-center my-20 mx-auto ">
      <div className="text-center text-6xl text-gray-800">
        This is the {reponame} Detail.
      </div>
    </div>
  );
}
