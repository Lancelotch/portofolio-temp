import axios from "axios";
const REACT_APP_API_MAIN_SERVICE = process.env.REACT_APP_API_MAIN_SERVICE;
const REACT_APP_API_CART_SERVICE = process.env.REACT_APP_API_CART_SERVICE;
const REACT_APP_API_DUMMY_SERVICE = process.env.REACT_APP_API_DUMMY_SERVICE;

const token = localStorage.getItem("accessToken");
const tokenDummy = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVJZCI6IjU0OGJkYTc3LTg3Y2EtNGJkZC05MTVmLTg1OGM4NjU0NTFhOCIsImF1ZCI6WyJtdy9tb25nZ29wZXNlbkFwcCIsIm1zL3N1cGVyYWRtaW4iLCJtcy91c2VyIl0sInVzZXJfbmFtZSI6ImN1c3RvbWVyQG1vbmdnb3Blc2VuLmNvbSIsInNjb3BlIjpbIndyaXRlIiwicmVhZCIsInRydXN0Il0sImV4cCI6MTU5OTEwOTI1MSwiYXV0aG9yaXRpZXMiOlsiQ1VTIiwiNTQ4YmRhNzctODdjYS00YmRkLTkxNWYtODU4Yzg2NTQ1MWE4Il0sImp0aSI6IjU4Yjc4ODFiLTYwYjYtNDNmOS05NDU1LTI5Njg2NjNjZGMxNCIsImVtYWlsIjoiY3VzdG9tZXJAbW9uZ2dvcGVzZW4uY29tIiwiY2xpZW50X2lkIjoibW9uZ2dvcGVzZW5BcHAifQ.nPIXAxBO8aiowWOFbqYY85pLe-rZ1UdTTbn85NULsNGyFqmvn5aPma4VqEl4GSLA_nHG6MJLueyj83yPYVTYGzXZ4IDJcAch85ECNfxLOqnjB7INe6eUCwZ0Pjqs3YR15o80tQnriC5BVI0YOt8d6plKXW3nTkA6eNpPDIHjMw4cQcg2wQUCY6worDlCx-Bk2AsAL4B0FXmSZcA8coQrpN_k_rk3TxuFQr2eOgaqtR__EfFwf_Z6vTR-wtj_Mnz8qhqSdHHxSAVfFqiLhmxLhh1ho86deHGZI3_q_Abvn6hNWsGVEXyKfaFaJFZ9QNYhQJFksLH64OiCMvbplGextA";

export const mainService = axios.create({
  baseURL: REACT_APP_API_MAIN_SERVICE,
  timeout: 60 * 4 * 1000,
  // headers: {
  //   Authorization: "Bearer " + token
  // }
});

export const cartService = axios.create({
  baseURL: REACT_APP_API_CART_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});

export const dummyServiceLogin = axios.create({
  baseURL: REACT_APP_API_DUMMY_SERVICE,
  timeout: 60 * 4 * 1000,
  // headers: {
  //   Authorization: "Bearer " + token
  // }
});

export const dummyService = axios.create({
  baseURL: 'http://c43ccbcf.ngrok.io/api/v1/',
  timeout: 60 * 4 * 1000,
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${tokenDummy}`
  }
});

export const dummyServiceWithToken = axios.create({
  baseURL: REACT_APP_API_DUMMY_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});