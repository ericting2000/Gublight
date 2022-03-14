import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useRef, useCallback } from 'react';
import Header from '../../../../components/Header';
import LandingHeader from '../../../../components/LandingHeader';
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
    <>
      <div>
        <Header />
      </div>
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
                  Stars: {repo.stargazers_count}
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
                  Stars: {repo.stargazers_count}
                </p>
              </div>
            );
          }
        })}
        {/* <div className="text-5xl text-blue-600">
      {loading && 'Loading.......'}
    </div> */}
        {loading && (
          <div className="py-2.5 px-5 mt-10 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700  inline-flex items-center">
            <svg
              role="status"
              className="inline mr-2 w-4 h-4 text-gray-200 animate-spin "
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Loading...
          </div>
        )}
        <div className="text-5xl text-red-600">{error && 'Error.......'}</div>
      </div>
    </>
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
