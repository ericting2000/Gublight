import Image from 'next/image';
import Gublight from '../public/icon/GubLight.svg';
import Github from '../public/icon/Github.svg';
import Search from '../public/icon/Search.svg';
import Link from 'next/link';
import styles from '../styles/Header.module.sass';
import Collapse from '@kunukn/react-collapse';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FuzzyUser, KeyboardEvent } from '../utils/types';
import useFuzzySearch from '../hooks/useFuzzySearch';

function Limit({ limit }: { limit: boolean }) {
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

function FuzzySearch({
  isInput,
  loading,
  users,
  limit,
  empty,
}: {
  isInput: boolean;
  loading: boolean;
  users: FuzzyUser[];
  limit: boolean;
  empty: boolean;
}) {
  return (
    <div>
      {isInput && (
        <div className={styles.fuzzy}>
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
          <Limit limit={limit} />
          {!loading && empty && <div>No match found</div>}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [isOpened, setIsOpened] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();
  const [isInput, setIsInput] = useState(false);
  const { loading, limit, empty, users } = useFuzzySearch(username);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (username === '') {
      setIsInput(false);
    } else {
      setIsInput(true);
    }
  }, [username]);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      if (window.innerWidth >= 768) {
        setIsOpened(false);
        setUsername('');
      }
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  const handleRouteChange = (path: string) => {
    router.push(path);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.keyCode === 13) {
      handleRouteChange('/users/' + username + '/repos');
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.cntanr}>
          <div className="flex justify-center items-center">
            <div>
              <Link href="/">
                <a className="pt-[6px]">
                  <Image src={Gublight} alt="GubLight Logo" />
                </a>
              </Link>
            </div>
            <div className={styles.searchtop}>
              <div className="flex  justify-center items-center text-xl rounded-md  w-full">
                <input
                  type="text"
                  className={styles.input}
                  autoFocus
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  onKeyDown={onKeyDown}
                />
                <div className="absolute top-[54px] left-1 w-[60%] md:w-[70%]">
                  <FuzzySearch
                    isInput={isInput}
                    limit={limit}
                    loading={loading}
                    empty={empty}
                    users={users}
                  />
                </div>
                <button
                  className={styles.button}
                  onClick={() => {
                    setUsername(username);
                    handleRouteChange('/users/' + username + '/repos');
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className={styles.githublink}>
            <a
              href="https://github.com/ericting2000/2022-Dcard-Web-Frontend-Intern-Homework"
              className="pt-[6px]"
            >
              <Image src={Github} alt="Github Logo" width={20} height={20} />
            </a>
          </div>
          <div className={styles.search}>
            <Image
              src={Search}
              alt="search"
              width={20}
              height={28}
              onClick={() => {
                setIsOpened(!isOpened);
              }}
            />
          </div>
        </div>
      </div>
      <Collapse
        isOpen={isOpened}
        transition={`height 300ms cubic-bezier(.4, 0, .2, 1)`}
        className={styles.collapse}
      >
        <div className="flex flex-row justify-center items-center text-xl rounded-md mt-5 w-full">
          <input
            type="text"
            className="text-[#393939] rounded-md  w-[60%] md:w-[70%]  py-1 px-2 mr-3 "
            autoFocus
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyDown={onKeyDown}
          />

          <button
            className={styles.collapsebutton}
            onClick={async () => {
              setUsername(username);

              handleRouteChange('/users/' + username + '/repos');
            }}
          >
            Search
          </button>
        </div>
        <div className="w-[85%] mb-5 ">
          <FuzzySearch
            isInput={isInput}
            limit={limit}
            loading={loading}
            empty={empty}
            users={users}
          />
        </div>
      </Collapse>
    </div>
  );
}
