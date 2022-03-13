import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useRef, useCallback } from 'react';
import RepoCard from '../../../../components/RepoCard';
import useFetchRepo from '../../../../hooks/useFetchRepoList';
import { RepoData } from '../../../../utils/types';

interface Props {
  username: string;
}

export default function RepoList(props: Props) {
  //const [user, setUser] = useState('');
  const [page, setPage] = useState(1);
  const router = useRouter();
  const user = props.username;
  const { loading, repos, error, hasMore } = useFetchRepo(user, page);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastRepo = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage: number) => {
            return prevPage + 1;
          });
        }
      });
      if (node) {
        observer.current.observe(node);
      }
      //console.log('node = ' + node);
    },
    [loading, hasMore]
  );

  //let user = router.query.username as string;
  //console.log('user = ' + user);
  //setUser(props.username);

  //const repos = props.Repos;
  //console.log(props.Repos);

  return (
    <div className="container flex flex-col justify-center items-center my-20 mx-auto ">
      <div className="text-center text-6xl text-gray-800">
        This is {`${user}'s `}
        github RepoList.
      </div>
      {repos.map((repo: RepoData, index: number) => {
        //console.log(repo);
        if (repos.length === index + 1) {
          return (
            <div
              ref={lastRepo}
              key={repo.id}
              className="flex flex-row justify-center items-center "
            >
              <Link
                href={{
                  pathname: '/users/[username]/repos/[reponame]',
                  query: { username: user, reponame: repo.name },
                }}
              >
                <a className="text-4xl text-emerald-800 hover:text-emerald-500">
                  {repo.name}
                </a>
              </Link>
              <p className="text-3xl text-violet-700">
                Stars : {repo.stargazers_count}
              </p>
            </div>
          );
        } else {
          return (
            <div
              key={repo.id}
              className="flex flex-row justify-center items-center "
            >
              <Link
                href={{
                  pathname: '/users/[username]/repos/[reponame]',
                  query: { username: user, reponame: repo.name },
                }}
              >
                <a className="text-4xl text-emerald-800 hover:text-emerald-500">
                  {repo.name}
                </a>
              </Link>
              <p className="text-3xl text-violet-700">
                Stars : {repo.stargazers_count}
              </p>
            </div>
          );
        }
      })}
      <div className="text-5xl text-blue-600">
        {loading && 'Loading.......'}
      </div>
      <div className="text-5xl text-red-600">{error && 'Error.......'}</div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params!;
  const username = params.username;

  return {
    props: {
      username,
    },
  };
};
