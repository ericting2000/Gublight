import { useState, useEffect } from 'react';
import { RepoData } from '../utils/types';

export default function useFetchRepo(username: string, page: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState<Array<RepoData>>([]);
  const [hasMore, setHasMore] = useState(false);

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
        setRepos((prevRepos: Array<RepoData>): Array<RepoData> => {
          return Array.from(
            new Set([...prevRepos, ...data.map((repo: RepoData) => repo)])
          );
        });
        setHasMore(data.length > 0);
        setLoading(false);
        //console.log(data);
      } catch (err) {
        setError(true);
        console.log('Something Went Wrong!!!');
        console.log(err);
      }
    }

    getRepoList(username, page);
    //console.log('TEST HOOK FUNCTION');
  }, [username, page]);

  return { loading, error, repos, hasMore };
}
