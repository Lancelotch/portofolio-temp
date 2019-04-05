import axios from "axios";
const REACT_APP_API_MAIN_SERVICE = process.env.REACT_APP_API_MAIN_SERVICE;
const REACT_APP_API_CART_SERVICE = process.env.REACT_APP_API_CART_SERVICE;
const REACT_APP_API_DUMMY_SERVICE = process.env.REACT_APP_API_DUMMY_SERVICE;

const token = localStorage.getItem("accessToken");
const tokenDummy = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVJZCI6IjVjMDc5NGI1LTI4NWItNDAxMS05MjE1LTkxMDlkMmI0YjY2NSIsImF1ZCI6WyJtdy9tb25nZ29wZXNlbkFwcCIsIm1zL3N1cGVyYWRtaW4iLCJtcy91c2VyIl0sInVzZXJfbmFtZSI6ImNhbmRyYUBtYWlsaW5hdG9yLmNvbSIsInNjb3BlIjpbIndyaXRlIiwicmVhZCIsInRydXN0Il0sImV4cCI6MTU5NjI2NDQzMCwiYXV0aG9yaXRpZXMiOlsiQ1VTIiwiNWMwNzk0YjUtMjg1Yi00MDExLTkyMTUtOTEwOWQyYjRiNjY1Il0sImp0aSI6IjM5MTUxZTMzLTlmODAtNDg0ZS04Y2ViLTY1ZWRlNjNhOGY0ZSIsImVtYWlsIjoiY2FuZHJhQG1haWxpbmF0b3IuY29tIiwiY2xpZW50X2lkIjoibW9uZ2dvcGVzZW5BcHAifQ.J9TY2o0Qby7MPpEjnKdOPG1YiFkrIOdEG7Ka9vowvhZYGjkSLnolWCpG5jri04sPDoxaiqI-u2LsyRiQGfiE0KMbyEAHAGrms2YW_W7UynJ4IraUzYBV9dGpMehOS83YQMbKZxUxEYsWM_7iuBFJnd7Mn5agqYYsTxLl7W7tgGe08alQmdJ4lkzr23A__C_K3iF2Ckzn5UdpsIThyOivF7lLEYUC0Z-qhytO4Bhb5RWtqIp7sFLwtEb8O05OwpIjmFA9F90pFv_KekG9bdbB9cdz4kIEP4HKr9Nzi9UxcWxlaUnqATK20UyUHcS0mfFd6tWY0eCT14IJsZo8LCGUfA";

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
  baseURL: REACT_APP_API_DUMMY_SERVICE,
  timeout: 60 * 4 * 1000,
  // headers: {
  //   "Content-Type": `application/json`,
  //   Authorization: `Bearer ${tokenDummy}`
  // }
});

export const dummyServiceWithToken = axios.create({
  baseURL: REACT_APP_API_DUMMY_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});