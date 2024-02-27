import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
  interface WeatherData {
    days: {
      datetime: string;
      temp: number;
      icon: 'string';
    }[];
  }

  const [data, setData] = useState<WeatherData>({ days: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setIsLoading(false);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(`${error} Could not Fetch Data `);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
