import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function usePatchApiHook(
  url: string,
  requestBody: { [key: string]: any }
): {
  data: { [key: string]: any } | null;
  isLoading: boolean;
  error: any;
} {
  const [data, setData] = useState<{ [key: string]: any } | null>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const postData = async () => {
    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.patch(url, requestBody);
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
    postData();
  }, [url, requestBody]);

  return { data, isLoading, error };
}
