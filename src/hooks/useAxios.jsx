import { useState, useCallback } from 'react';
import axios from 'axios';

export function useAxios () {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      setIsLoading(true);
      const res = await axios({
        url: requestConfig.url,
        method: requestConfig.method ||'GET',
        headers: requestConfig.headers || {},
        data: requestConfig.data || null
      });
      // console.log('res', res);
      applyData(res.data);
    } catch(error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest
  }
}