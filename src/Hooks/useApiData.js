import { useState, useEffect } from 'react';
import axios from 'axios';

const useApiData = (endpoint, initialData = null, options = {}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios({
          url: endpoint,
          method: options.method || 'GET',
          headers: options.headers,
          params: options.params,
          data: options.data,
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
        setData(initialData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      setData(initialData);
      setLoading(false);
      setError(null);
    };
  }, [endpoint, options.method, JSON.stringify(options.params), JSON.stringify(options.data)]);

  // Function to manually refetch data
  const refetch = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: endpoint,
        method: options.method || 'GET',
        headers: options.headers,
        params: options.params,
        data: options.data,
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
      setData(initialData);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export default useApiData;