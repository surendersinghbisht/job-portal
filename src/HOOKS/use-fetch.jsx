import { useState, useCallback } from 'react';

const useFetch = (cb, options) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const fn = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(options, ...args); 
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [cb, options]); 

  return { data, fn, error, loading };
};

export default useFetch;
