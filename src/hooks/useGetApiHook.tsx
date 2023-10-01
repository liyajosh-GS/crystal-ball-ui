import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useGetApiHook(url: string): {
  data: { [key: string]: any } | null;
  isLoading: boolean;
  error: any;
} {
  const [data, setData] = useState<{ [key: string]: any } | null>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const getData = async () => {
    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.get(url);
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
    getData();
  }, [url]);

  return { data, isLoading, error };
}
