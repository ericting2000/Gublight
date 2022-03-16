import Image from 'next/image';
import Gublight from '../public/assets/icon/GubLight.svg';
import Github from '../public/assets/icon/Github.svg';
import Search from '../public/assets/icon/Search.svg';
import Link from 'next/link';
import styles from '../styles/Header.module.sass';
import Collapse from '@kunukn/react-collapse';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { KeyboardEvent } from '../utils/types';

function Header() {
  const [isOpened, setIsOpened] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
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
    //console.log(router.asPath);
    //if (path !== router.asPath) {
    router.push(path);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.keyCode === 13) {
      //console.log('ENTER!!!');
      handleRouteChange('/users/' + username + '/repos');
    }
  };

  return (
    <div className="web-header bg-[#161B22] w-full h-20 ">
      <div className="container flex justify-between items-center my-0 mx-auto  h-20 px-10 ">
        <div className="flex justify-center items-center">
          <div>
            <Link href="/">
              <a>
                <Image src={Gublight} alt="GubLight Logo" />
              </a>
            </Link>
          </div>
          <div className={styles.searchtop}>
            <div className="flex  justify-center items-center text-xl rounded-md  w-full">
              <input
                type="text"
                className="text-[#393939] rounded-md my-5 w-[60%] md:w-[70%]  py-0.5 px-2 mr-3 "
                autoFocus
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  ///console.log(username);
                }}
                onKeyDown={onKeyDown}
              />
              <button
                className="bg-[#58A957] hover:bg-[#6fce6d] active:bg-[#4e914d] transition duration-300 rounded-md px-1 py-0.5 "
                onClick={() => {
                  setUsername(username);
                  //console.log(username);
                  handleRouteChange('/users/' + username + '/repos');
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className={styles.githublink}>
          <a href="https://github.com/ericting2000/2022-Dcard-Web-Frontend-Intern-Homework">
            <Image src={Github} alt="Github Logo" />
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
      <Collapse
        isOpen={isOpened}
        transition={`height 300ms cubic-bezier(.4, 0, .2, 1)`}
        className="bg-[#2F3134] border-none "
      >
        <div className="flex  justify-center items-center text-xl rounded-md  w-full">
          <input
            type="text"
            className="text-[#393939] rounded-md my-5 w-[60%] md:w-[70%]  py-1 px-2 mr-3 "
            autoFocus
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyDown={onKeyDown}
          />
          <button
            className="bg-[#58A957] hover:bg-[#6fce6d] active:bg-[#4e914d] transition duration-300 rounded-md px-2 py-1 "
            onClick={async () => {
              setUsername(username);
              //console.log(username);

              handleRouteChange('/users/' + username + '/repos');
            }}
          >
            Search
          </button>
        </div>
      </Collapse>
    </div>
  );
}

export default Header;
