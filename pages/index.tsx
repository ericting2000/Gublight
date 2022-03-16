import { useState } from 'react';
import { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';
import Head from 'next/head';
import LandingHeader from '../components/LandingHeader';
import { KeyboardEvent } from '../utils/types';

function Body() {
  const [username, setUsername] = useState('');
  const router = useRouter();

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
          <title>GubLight</title>
          <link rel="icon" href="/favicon.png" />
        </Head>

        <div className=" text-white font-bold lg:pr-[200px] xl:pr-[450px] 2xl:pr-[500px] pt-20 sm:pt-[200px] xl:pt-[250px]">
          <div className="flex flex-col justify-center items-center">
            <div className="text-[44px] sm:text-6xl md:text-7xl lg:text-[84px]  flex flex-col justify-center items-start ">
              <p>Explore the </p>
              <p className="sm:leading-relaxed">software fantasy</p>
              <p className="text-[24px] sm:text-[36px] text-[#CECECE] font-extralight sm:leading-[50px] lg:leading-[30px]">
                Find the next masterpiece
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center text-xl rounded-md md:mt-5 w-full">
              <input
                type="text"
                className="text-[#393939] rounded-md my-5 w-11/12 md:w-[70%] lg:w-[76%] py-1 px-2 md:mr-3 lg:px-[13px] lg:py-[8px]"
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
                Explore user
              </button>
            </div>
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
