import { useState } from 'react';
import { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';

function LandingPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleRouteChange = (path: string) => {
    router.push(path);
  };

  return (
    <div className="container flex flex-col justify-center items-center my-20 mx-auto ">
      <div className="text-center text-6xl text-gray-800">
        This is the LandingPage
      </div>
      <div className="flex justify-center items-center text-3xl my-10">
        <input
          className="border-2 border-blue-900 rounded px-2 py-1 mx-5"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button
          className="border-2 border-gray-800 active:border-red-400 rounded px-5 py2.5"
          onClick={() => {
            setUsername(username);
            console.log(username);
            handleRouteChange('/users/' + username + '/repos');
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
