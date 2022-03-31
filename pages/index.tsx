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

function Body() {
  const [isInput, setIsInput] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();
  const { loading, limit, empty, error, users } = useFuzzySearch(username);
  //console.log(isInput);

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
    <div className="body bg-[#040D21] w-full h-screen absolute !z-0 overflow-hidden">
      <div className="!z-10 absolute">
        <div
          className="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] bg-[#B5EDFA] bg-opacity-30 rounded-full relative top-[250px] left-[5px] "
          style={{ boxShadow: '0px 0px 33px 62px rgba(181, 237, 250, 0.3' }}
        />
        <div
          className="w-[20px] h-[20px] sm:w-[70px] sm:h-[70px] md:w-[130px] md:h-[130px] lg:w-[180px] lg:h-[180px] bg-[#F181304D] bg-opacity-30 rounded-full relative top-[20px] left-[250px] sm:left-[350px] md:left-[500px] lg:top-[-100px] lg:left-[700px] xl:left-[950px]"
          style={{ boxShadow: '0px 0px 33px 62px rgba(241, 129, 48, 0.3' }}
        />
        <div
          className="w-[80px] h-[80px] sm:w-[130px] sm:h-[130px] md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px] bg-[#C63AC04D] bg-opacity-30 rounded-full relative top-[350px] left-[270px] sm:top-[450px] sm:left-[400px] lg:top-[300px] lg:left-[600px] xl:left-[900px]"
          style={{ boxShadow: '0px 0px 33px 62px rgba(198, 58, 192, 0.3' }}
        />
      </div>
      <div className="filter bg-[#040D213D] bg-opacity-[0.24] backdrop-blur-[33px] w-full h-screen  absolute !z-20"></div>
      <div className="container flex flex-col justify-center items-center my-0 mx-auto !z-30 relative top-0 left-0">
        <Head>
          <title>GubLight: Explore the software fantasy</title>
          <meta
            name="description"
            content="Explore the software fantasy. Search the Github Repo as you desire, find the next masterpiece."
          />
          <Favicon />
        </Head>

        <div className=" text-white font-bold lg:pr-[200px] xl:pr-[450px] 2xl:pr-[500px] pt-20 sm:pt-[200px] xl:pt-[250px]">
          <div className="flex flex-col justify-center items-start">
            <div className="text-[44px] sm:text-6xl md:text-7xl lg:text-[84px]  flex flex-col justify-center items-start ">
              <p>Explore the </p>
              <p className="sm:leading-relaxed">software fantasy</p>
              <p className="text-[24px] sm:text-[36px] text-[#CECECE] font-extralight sm:leading-[50px] lg:leading-[30px]">
                Find the next masterpiece
              </p>
            </div>
            <div className="flex flex-row justify-start items-center text-xl rounded-md md:mt-5 w-full">
              <input
                type="text"
                className="text-[#393939] rounded-md  w-[75%] md:w-[70%] lg:w-[76%] py-1 px-2 mr-2 md:mr-3 lg:px-[13px] lg:py-[8px]"
                autoFocus
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  //console.log(username);
                }}
                onKeyDown={onKeyDown}
              />
              <button
                className="bg-[#58A957] hover:bg-[#6fce6d] active:bg-[#4e914d] transition duration-300 rounded-md px-2 py-1 lg:px-[13px] lg:py-[8px]"
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
              <div className="grid grid-cols-1 bg-white  text-[#040D21] w-[73.8%] sm:w-[75%] md:w-[70%] lg:w-[76%] mt-0.5 px-2 py-1 rounded-md ">
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
                {/* {limit && (
                  <div>
                    <div>
                      <p>{`Sorry, you've hit the limit rate `}</p>
                      <p>Please try the Fuuzy Search again later.</p>
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
                )} */}
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
