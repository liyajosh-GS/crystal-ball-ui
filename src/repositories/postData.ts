import axios, { AxiosError, AxiosResponse } from "axios";
import { ACCESS_TOKEN } from "../constants/constant";

// export default async function postData(
//   url: string,
//   requestBody: any,
//   token?: any
// ): Promise<any> {
//   let isLoading: boolean = true;
//   let data;
//   let error;
//   const serverUrl = process.env.REACT_APP_SERVER_URL;
//   try {
//     console.log("token print " + token);
//     let headers;
//     if (token) {
//       headers = {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//       };
//     }

//     // const response: AxiosResponse = await axios
//     //   .get(serverUrl + "/csrf")
//     //   .then((tokenResp) => {
//     //     let config = {
//     //       headers: {
//     //         "X-CSRF-TOKEN": tokenResp.data.token,
//     //       },
//     //     };
//     //     return axios.post(serverUrl + url, requestBody, config);
//     //   });

//     //console.log("config " + JSON.stringify(config));
//     const response: any = await axios
//       .post(serverUrl + url, requestBody, { headers: headers })
//       .then((response) => {
//         console.log("sresponse " + JSON.stringify(response));
//       })
//       .catch((e) => {
//         console.log("eresponse " + JSON.stringify(e));
//       });

//     console.log("resposne " + JSON.stringify(response));
//     if (response.request?.responseUrl) {
//       console.log("get in");
//     }

//     data = response.data;
//     error = null;
//   } catch (err: any) {
//     error = err;
//     data = null;
//   } finally {
//     isLoading = false;
//   }
//   return { isLoading, data, error };
// }

export default async function postData(
  url: string,
  requestBody: any,
  token?: any
): Promise<any> {
  let isLoading: boolean = true;
  let data;
  let error;
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  //try {
  console.log("token print " + token);
  let headers;
  if (token) {
    console.log("HAS TOKEN " + token);
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
        sessionStorage.setItem(ACCESS_TOKEN, response.data.token);
      }
      error = null;
    })
    .catch((reason: AxiosError) => {
      console.log("error " + JSON.stringify(reason));
      data = null;
      error = reason;
    })
    .finally(function setLoading() {
      isLoading = false;
    });
  return { isLoading, data, error };
}
//http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect
