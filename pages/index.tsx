import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';
import Head from 'next/head';
import LandingHeader from '../components/LandingHeader';
import { FuzzyUser, KeyboardEvent } from '../utils/types';
import Favicon from '../utils/Favicon';
import useFuzzySearch from '../hooks/useFuzzySearch';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/styles.module.sass';

function Loading({ loading }: { loading: boolean }) {
  return (
    <div>
      {loading && (
        <div className="text-center">
          <div className="mx-auto my-0">
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
          </div>
        </div>
      )}
    </div>
  );
}

function RateLimit({ limit }: { limit: boolean }) {
  return (
    <div>
      {limit && (
        <div>
          <div>
            <p>{`Sorry, you've hit the limit rate `}</p>
            <p>Please try the Fuzzy Search again later.</p>
            <p>
              For more information, visit{' '}
              <span className="hover:underline text-[#58A7FF]">
                <a href="https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting">
                  here.
                </a>
              </span>
            </p>
          </div>
          <div className="text-[#aa3232]">
            Rest of the function is not affected.
          </div>
        </div>
      )}
    </div>
  );
}

function Body() {
  const [isInput, setIsInput] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();
  const { loading, limit, empty, users } = useFuzzySearch(username);

  useEffect(() => {
    if (username === '') {
      setIsInput(false);
    } else {
      setIsInput(true);
    }
  }, [username]);

  const handleRouteChange = (path: string) => {
    router.push(path);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.keyCode === 13) {
      //console.log('ENTER!!!');
      handleRouteChange('/users/' + username + '/repos');
    }
  };

  return (
    <div className={styles.body}>
      <div className="!z-10 absolute">
        <div
          className={styles.eclipse1}
          style={{ boxShadow: '0px 0px 33px 62px rgba(181, 237, 250, 0.3' }}
        />
        <div
          className={styles.eclipse2}
          style={{ boxShadow: '0px 0px 33px 62px rgba(241, 129, 48, 0.3' }}
        />
        <div
          className={styles.eclipse3}
          style={{ boxShadow: '0px 0px 33px 62px rgba(198, 58, 192, 0.3' }}
        />
      </div>
      <div className={styles.glassphormism} />
      <div className={styles.cntanr}>
        <Head>
          <title>GubLight: Explore the software fantasy</title>
          <meta
            name="description"
            content="Explore the software fantasy. Search the Github Repo as you desire, find the next masterpiece."
          />
          <meta property="og:image" content="https://i.imgur.com/Xf81Hvo.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://gublight.com" />
          <Favicon />
        </Head>

        <div className={styles.main}>
          <div className="flex flex-col justify-center items-start">
            <div className={styles.maincopy}>
              <p>Explore the </p>
              <p className="sm:leading-relaxed">software fantasy</p>
              <p className={styles.maincopyp3}>Find the next masterpiece</p>
            </div>
            <div className={styles.mainsearch}>
              <input
                type="text"
                className={styles.mainsearchinput}
                autoFocus
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  //console.log(username);
                }}
                onKeyDown={onKeyDown}
              />
              <button
                className={styles.mainsearchbutton}
                onClick={() => {
                  setUsername(username);
                  //console.log(username);
                  handleRouteChange('/users/' + username + '/repos');
                }}
              >
                Explore
              </button>
            </div>
            {isInput && (
              <div className={styles.fuzzy}>
                <Loading loading={loading} />
                {users.map((user: FuzzyUser, index: number) => {
                  if (index !== users.length - 1) {
                    return (
                      <div
                        key={user.id}
                        className="hover:text-[#1b65b9] transition duration-300 "
                      >
                        <div className="flex justify-start items-center">
                          <Image
                            src={user.avatar_url}
                            alt="user-avatar"
                            width={18}
                            height={18}
                            className="rounded-full"
                          />

                          <Link
                            href={{
                              pathname: '/users/[username]/repos',
                              query: { username: user.login },
                            }}
                          >
                            <a href="" className="ml-2">
                              {user.login}
                            </a>
                          </Link>
                        </div>

                        <div className="border-b border-[#c4c4c4] w-full" />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={user.id}
                        className="hover:text-[#1b65b9] transition duration-300"
                      >
                        <div className="flex justify-start items-center">
                          <Image
                            src={user.avatar_url}
                            alt="user-avatar"
                            width={18}
                            height={18}
                            className="rounded-full"
                          />

                          <Link
                            href={{
                              pathname: '/users/[username]/repos',
                              query: { username: user.login },
                            }}
                          >
                            <a href="" className="ml-2">
                              {user.login}
                            </a>
                          </Link>
                        </div>
                      </div>
                    );
                  }
                })}
                <RateLimit limit={limit} />
                {!loading && empty && <div>No match found</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <div>
      <LandingHeader />
      <Body />
    </div>
  );
}

export default LandingPage;
