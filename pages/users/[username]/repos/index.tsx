import { useRouter } from 'next/router';

export default function RepoList({ repos: {} }) {
  const router = useRouter();
  const username = router.query.username;
  return (
    <div className="container flex flex-col justify-center items-center my-20 mx-auto ">
      <div className="text-center text-6xl text-gray-800">
        This is the {username} github RepoList.
      </div>
    </div>
  );
}

// export async function getStaticProps(username: string) {
//   try {
//     const res = await fetch(
//       `https://api.github.com/users/${username}/repos?per_page=10&&page=1`
//     );
//     const data = await res.json();
//     console.log(data);
//     return {
//       props: {
//         repos: data,
//       },
//     };
//   } catch (err) {
//     console.log(err, 'something went wrong');
//   }
// }
