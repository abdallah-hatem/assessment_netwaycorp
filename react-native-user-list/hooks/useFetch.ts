import { useEffect, useState } from "react";

interface FetchCall<T> {
  GET: (params?: any) => Promise<T>;
  params?: any;
  defaultValue?: any;
  allowedToFetch?: boolean;
  onFetchSuccess?: (data: T | T[]) => void;
  dependencies?: any[];
}

interface Props<T> {
  GET?: (params?: any) => Promise<T>;
  params?: any;
  multiFetch?: FetchCall<T>[];
  dependencies?: any[];
  defaultValue?: any;
  allowedToFetch?: boolean;
  onFetchSuccess?: (data: T | T[]) => void;
}

const useFetch = <T = any>({
  GET,
  params = {},
  multiFetch,
  dependencies = [],
  defaultValue,
  allowedToFetch = true,
  onFetchSuccess,
}: Props<T>) => {
  const [data, setData] = useState<T | null>(defaultValue ?? null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!allowedToFetch) setData(null);
  }, [allowedToFetch]);

  const getData = async () => {
    if (!allowedToFetch) return setLoading(false);

    setLoading(true);
    setError(null);

    if (multiFetch && allowedToFetch) {
      try {
        const results = await Promise.all(multiFetch.map(({ GET, params }) => GET(params)));

        setData(results as unknown as T);
        onFetchSuccess?.(results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    } else if (GET && allowedToFetch) {
      GET(params)
        .then((res: T) => {
          setData(res);
          onFetchSuccess?.(res);
        })
        .catch((err: any) => setError(err))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, [...dependencies]);

  const refetch = () => getData();

  return { data, loading, error, refetch };
};

export default useFetch;
