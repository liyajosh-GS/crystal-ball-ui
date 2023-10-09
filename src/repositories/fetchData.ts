import axios, { AxiosResponse } from "axios";

export default async function fetchData(url: string): Promise<any> {
  let isLoading: boolean = true;
  let data;
  let error;
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  try {
    const response: AxiosResponse = await axios.get(serverUrl + url);
    data = response.data;
    error = null;
  } catch (err: any) {
    error = err;
    data = null;
  } finally {
    isLoading = false;
  }
  return { isLoading, data, error };
}
