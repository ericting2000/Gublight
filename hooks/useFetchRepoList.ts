import { useState, useEffect } from 'react';
import { RepoData } from '../utils/types';

export default function useFetchRepo(username: string, page: number) {
  const [firstFetch, setFirstFetch] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState<Array<RepoData>>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setRepos([]);
  }, [username]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    async function getRepoList(username: string, page: number) {
      //console.log('page in fetch function = ' + page);
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=10&page=${page}`
        );
        const data = await res.json();
        //console.log(data);
        if (Object.values(data)[0] === 'Not Found') {
          throw 'Not Found';
        }
        if (data.length === 0 && firstFetch) {
          throw 'Empty';
        }
        setRepos((prevRepos: Array<RepoData>): Array<RepoData> => {
          return Array.from(
            new Set([...prevRepos, ...data.map((repo: RepoData) => repo)])
          );
        });
        setFirstFetch(false);
        setHasMore(data.length > 0);
        setLoading(false);
        //console.log(data);
      } catch (err) {
        if (err === 'Empty') {
          setEmpty(true);
          setLoading(false);
        }
        if (err === 'Not Found') {
          setLoading(false);
          setError(true);
        }

        //console.log('Something Went Wrong!!!');
        console.log(err);
      }
    }

    getRepoList(username, page);
    //console.log('TEST HOOK FUNCTION');
  }, [username, page]);

  return { empty, loading, error, repos, hasMore };
}
