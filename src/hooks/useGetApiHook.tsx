import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useGetApiHook(url: string): {
  data: any | null;
  isLoading: boolean;
  error: any;
} {
  const [data, setData] = useState<any | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const getData = async () => {
    setIsLoading(true);
    try {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const response: AxiosResponse = await axios.get(serverUrl + url);
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (url !== "") {
      getData();
    }
  }, [url]);

  return { data, isLoading, error };
}
