import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { RepoData, RepoDetail } from '../../../../utils/types';

interface Props {
  detail: RepoDetail;
}

export default function Repo(props: Props) {
  const router = useRouter();
  const reponame = router.query.reponame as string;

  const detail = props.detail;
  return (
    <div className="container flex flex-col justify-center items-center my-20 mx-auto ">
      <div className="text-center text-6xl text-gray-800">
        This is the {reponame} Detail.
      </div>
      {<p className="text-4xl text-emerald-800">{detail.full_name}</p>}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params!;
  const reponame = params.reponame;
  const username = params.username;

  //console.log('username =' + username);
  //console.log('reponame = ' + reponame);

  const res = await fetch(
    `https://api.github.com/repos/${username}/${reponame}`
  );
  const data = await res.json();
  console.log(data);
  return {
    props: {
      detail: data as RepoDetail,
    },
  };
};
