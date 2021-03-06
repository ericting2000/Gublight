import { useState, useEffect, useRef } from 'react';
import { FuzzyData, FuzzyUser } from '../utils/types';

export default function useFuzzySearch(username: string) {
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Array<FuzzyUser>>([]);
  const [limit, setLimit] = useState(false);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const queryString = 'q=' + encodeURIComponent(`${username} in:login`);

  useEffect(() => {
    setUsers([]);
  }, [username]);

  useEffect(() => {
    setLoading(true);

    function getUserList(queryString: string) {
      clearTimeout(timeout.current as NodeJS.Timeout);

      timeout.current = setTimeout(async () => {
        try {
          const res = await fetch(
            `https://api.github.com/search/users?${queryString}&per_page=5`
          );
          if (res.status === 422) {
            return;
          }
          if (res.status === 403) {
            setLoading(false);
            setLimit(true);
            return;
          }
          if (res.status === 404) {
            setLoading(false);

            return;
          }
          const data = await res.json();
          if (data.total_count === 0) {
            setLoading(false);
            setEmpty(true);
            return;
          }
          const users = data.items.map((user: FuzzyUser) => {
            return user;
          });
          if (users.length === 0) {
            setEmpty(true);
            return;
          }
          setUsers((prevUsers: Array<FuzzyUser>): Array<FuzzyUser> => {
            return Array.from(
              new Set([...prevUsers, ...users.map((user: FuzzyUser) => user)])
            );
          });
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }, 600);
    }

    getUserList(queryString);
  }, [queryString]);

  return { loading, limit, empty, users };
}
