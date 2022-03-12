import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RepoCard from '../../../../components/RepoCard';

interface Props {
  Repos: Array<Object>;
}

export default function RepoList(props: Props) {
  const router = useRouter();
  const username = router.query.username as string;

  const Repos = props.Repos;
  console.log(props.Repos);

  return (
    <div className="container flex flex-col justify-center items-center my-20 mx-auto ">
      <div className="text-center text-6xl text-gray-800">
        This is {`${username}'s `}
        github RepoList.
      </div>
      {Repos.map((repo: any) => {
        console.log(repo);
        return (
          <div key={repo.id}>
            <Link
              href={{
                pathname: '/users/[username]/repos/[reponame]',
                query: { username: username, reponame: repo.name },
              }}
            >
              <a className="text-5xl text-emerald-800 hover:text-emerald-500">
                {repo.name}
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params!;
  const username = params.username;

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=10`
  );
  const data = await res.json();
  //console.log(data);
  return {
    props: {
      Repos: data as Array<Object>,
    },
  };
};
