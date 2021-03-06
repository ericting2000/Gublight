import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useRef, useCallback, useEffect } from 'react';
import Header from '../../../../components/Header';
import useFetchRepo from '../../../../hooks/useFetchRepoList';
import { RepoData } from '../../../../utils/types';
import Image from 'next/image';
import Star from '../../../../public/icon/Star.svg';
import styles from '../../../../styles/index.module.sass';
import Footer from '../../../../components/Footer';
import Head from 'next/head';
import Favicon from '../../../../utils/Favicon';

interface Props {
  username: string;
}

function Loading({ loading }: { loading: boolean }) {
  return (
    <div>
      {loading && (
        <div className={styles.loading}>
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
    </div>
  );
}

function ErrorHandle({
  empty,
  limit,
  error,
  user,
}: {
  empty: boolean;
  limit: boolean;
  error: boolean;
  user: string;
}) {
  return (
    <div>
      <div className={styles.statediv}>
        {empty && (
          <div className={styles.state}>
            <p>{user} has no repository been created yet.</p>
          </div>
        )}
      </div>
      <div className={styles.statediv}>
        {error && (
          <div className={styles.state}>
            <p>{`Sorry, we cannot find what you're looking for.`}</p>
            <p>Please try again</p>
          </div>
        )}
      </div>
      <div className={styles.statediv}>
        {limit && (
          <div className={styles.state}>
            <p>{`Sorry, you've have reach the rate limit.`}</p>
            <p>Please try again later.</p>
            <p>
              For more information, please visit{` `}
              <span className="hover:underline text-[#58A7FF]">
                <a href="https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting">
                  here
                </a>
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RepoList(props: Props) {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const user = props.username;

  const { limit, empty, loading, repos, error, hasMore } = useFetchRepo(
    user,
    page
  );
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
        console.log('Fetch API!!');
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage: number) => {
            return prevPage + 1;
          });
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  return (
    <div className="bg-[#030D22] ">
      <Head>
        <title>{`${user}'s Github Repository List`}</title>
        <meta
          name="description"
          content={`${user}'s Github repository list. GubLight helps you to explore users and repos on Github.`}
        />
        <meta property="og:image" content="https://i.imgur.com/Xf81Hvo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gublight.com" />
        <Favicon />
      </Head>
      <div>
        <Header />
      </div>
      <div className={styles.cntanr}>
        {!error && (
          <div className="flex flex-col justify-center items-start w-full">
            <div className="text-center text-2xl text-white">{user}</div>
            <div className="border-b border-[#C4C4C4] mt-2 w-full" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 pb-10 w-full">
          {repos.map((repo: RepoData, index: number) => {
            if (repos.length === index + 1) {
              return (
                <div ref={lastRepo} key={repo.name} className={styles.repo}>
                  <Link
                    href={{
                      pathname: '/users/[username]/repos/[reponame]',
                      query: { username: user, reponame: repo.name },
                    }}
                  >
                    <a className="text-[#58A7FF] text-lg hover:underline">
                      {repo.name}
                    </a>
                  </Link>
                  <p className={styles.repodes}>{repo.description}</p>
                  <div className={styles.repoinfo}>
                    <p className="text-sm">{repo.language}</p>
                    <div className="flex flex-row justify-center items-center  ">
                      <Image src={Star} alt="star" width={14} height={13} />
                      <p className="pl-2">{repo.stargazers_count}</p>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={repo.name} className={styles.repo}>
                  <Link
                    href={{
                      pathname: '/users/[username]/repos/[reponame]',
                      query: { username: user, reponame: repo.name },
                    }}
                  >
                    <a className="text-[#58A7FF] text-lg hover:underline">
                      {repo.name}
                    </a>
                  </Link>
                  <p className={styles.repodes}>{repo.description}</p>
                  <div className={styles.repoinfo}>
                    <p className="text-sm">{repo.language}</p>
                    <div className="flex flex-row justify-center items-center ">
                      <Image src={Star} alt="star" width={14} height={13} />
                      <p className="pl-2">{repo.stargazers_count}</p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <Loading loading={loading} />
        <ErrorHandle limit={limit} error={error} empty={empty} user={user} />
      </div>

      {!hasMore && !empty && <Footer />}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params!;
  const username = params.username;

  return {
    props: {
      key: username,
      username,
    },
  };
};
