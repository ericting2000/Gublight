import { useState, useEffect } from 'react';
import { RepoData } from '../utils/types';

export default function useFetchRepo(username: string, page: number) {
  const [firstFetch, setFirstFetch] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState<Array<RepoData>>([]);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(false);

  useEffect(() => {
    setRepos([]);
  }, [username]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    async function getRepoList(username: string, page: number) {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=10&page=${page}`
        );
        if (res.status === 403) {
          setLoading(false);
          setLimit(true);
          setError(true);
          return;
        }
        const data = await res.json();
        if (Object.values(data)[0] === 'Not Found') {
          setLoading(false);
          setError(true);
          return;
        }
        if (data.length === 0 && firstFetch) {
          setEmpty(true);
          setLoading(false);
          return;
        }
        setRepos((prevRepos: Array<RepoData>): Array<RepoData> => {
          return Array.from(
            new Set([...prevRepos, ...data.map((repo: RepoData) => repo)])
          );
        });
        setFirstFetch(false);
        setHasMore(data.length > 0);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getRepoList(username, page);
  }, [username, page]);

  return { limit, empty, loading, error, repos, hasMore };
}
