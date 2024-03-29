import axios, { AxiosError } from "axios";
import { ACCESS_TOKEN } from "../constants/constant";

export default async function postData(
  url: string,
  requestBody: any,
  token?: any
): Promise<any> {
  let isLoading: boolean = true;
  let data;
  let error;
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  let headers;
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
  }

  await axios
    .post(serverUrl + url, requestBody, { headers: headers })
    .then((response) => {
      data = response.data;
      if (url === "/login" || url === "/register") {
        sessionStorage.setItem(ACCESS_TOKEN, response?.headers["x-token"]);
      }
      error = null;
    })
    .catch((reason: AxiosError) => {
      data = null;
      error = reason.response?.data;
    })
    .finally(function setLoading() {
      isLoading = false;
    });
  return { isLoading, data, error };
}
