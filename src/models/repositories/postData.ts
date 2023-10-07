import axios, { AxiosResponse } from "axios";

export default async function postData(
  url: string,
  requestBody: any,
  token?: any
): Promise<any> {
  let isLoading: boolean = true;
  let data;
  let error;
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  try {
    console.log("token print " + token);
    let headers;
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };
    }

    // const response: AxiosResponse = await axios
    //   .get(serverUrl + "/csrf")
    //   .then((tokenResp) => {
    //     let config = {
    //       headers: {
    //         "X-CSRF-TOKEN": tokenResp.data.token,
    //       },
    //     };
    //     return axios.post(serverUrl + url, requestBody, config);
    //   });

    //console.log("config " + JSON.stringify(config));
    const response: AxiosResponse = await axios.post(
      serverUrl + url,
      requestBody,
      { headers: headers }
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
