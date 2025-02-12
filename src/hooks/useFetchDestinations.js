import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchDestinations = ({ id = null, selectedTag = '' } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;
        if (id) {
          response = await axios.get(`${import.meta.env.VITE_API_URL}/api/destinations/${id}`);
          setData(response.data);
        } else {
          response = await axios.get(`${import.meta.env.VITE_API_URL}/api/destinations`, {
            params: { tags: selectedTag },
          });
          setData(response.data);
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [id, selectedTag]);

  return { data, loading, error };
};

export default useFetchDestinations;
