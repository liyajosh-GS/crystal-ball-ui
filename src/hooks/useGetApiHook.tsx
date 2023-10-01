import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useGetApiHook(url: string): {
  data: any | null;
  isApiLoading: boolean;
  apiError: any;
} {
  const [data, setData] = useState<any | null>();
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<any>();

  const getData = async () => {
    setIsApiLoading(true);
    try {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const response: AxiosResponse = await axios.get(serverUrl + url);
      setData(response.data);
      setApiError(null);
    } catch (err: any) {
      setApiError(err);
      setData(null);
    } finally {
      setIsApiLoading(false);
    }
  };

  useEffect(() => {
    if (url !== "") {
      getData();
    }
  }, [url]);

  return { data, isApiLoading, apiError };
}
