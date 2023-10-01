import axios, { AxiosResponse } from "axios";

export default async function postData(
  url: string,
  requestBody: any
): Promise<any> {
  // Simulate an asynchronous operation, e.g., fetching data from an API
  let isLoading: boolean = true;
  let data;
  let error;
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  try {
    const response: AxiosResponse = await axios.post(
      serverUrl + url,
      requestBody
    );
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
