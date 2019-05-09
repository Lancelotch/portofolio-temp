import axios from "axios";
const REACT_APP_API_MAIN_SERVICE = process.env.REACT_APP_API_MAIN_SERVICE;
const REACT_APP_API_CART_SERVICE = process.env.REACT_APP_API_CART_SERVICE;
const REACT_APP_API_DUMMY_SERVICE = process.env.REACT_APP_API_DUMMY_SERVICE;

const token = localStorage.getItem("accessToken");
const tokenDummy = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVJZCI6IjIyZjExMGY1LWM5ZWEtNDgyOS1hNGUxLWFhMWNlNzdhMTFlMCIsImF1ZCI6WyJtdy9tb25nZ29wZXNlbkFwcCIsIm1zL3N1cGVyYWRtaW4iLCJtcy91c2VyIl0sInVzZXJfbmFtZSI6ImN1c3RvbWVyQG1vbmdnb3Blc2VuLmNvbSIsInNjb3BlIjpbIndyaXRlIiwicmVhZCIsInRydXN0Il0sImV4cCI6MTYwMDU1Mzc4MCwiYXV0aG9yaXRpZXMiOlsiMjJmMTEwZjUtYzllYS00ODI5LWE0ZTEtYWExY2U3N2ExMWUwIiwiQ1VTIl0sImp0aSI6Ijc5OWUxZDgyLWRhNDktNGExYy05NmQ2LTdmY2Q1MDNlNjQzZSIsImVtYWlsIjoiY3VzdG9tZXJAbW9uZ2dvcGVzZW4uY29tIiwiY2xpZW50X2lkIjoibW9uZ2dvcGVzZW5BcHAifQ.ja2-d8Wl-4vDYAaowOUpf53aOAhLf6FPeNK56HwQsJgW_xcdHN_XNHTAs7Aby7bpbqAfFFu8tCKXLkfzaeqhKgC-cv5YRd5H7osMbt_ceo-MN9lcfsXENxYl_gG5kLHjrER_nX42F--b6aTHwfuw780gmpWLfd-beUaoi6mfg8KAwF-o2HlavFQVmlZ0cT7cNt3fjUH9AqhHZk1BNpczmSHvwRi-lZ-dw9TXmATpBQRLzAQXK4e8gEHrzOxiX7CwybIUZ1pTHhtnHBqpv9MQCsZaX_xdVge0ALtwTv1jm03jGIGls4LPmwoHYLZb7fglSjhP40HNSRhU5TTZOfOtHg";

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
  //baseURL: "http://65795874.ngrok.io/api/v1/",
  baseURL: REACT_APP_API_DUMMY_SERVICE,
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


export const serviceDummyWithToken = axios.create({
  baseURL: REACT_APP_API_DUMMY_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${token}`
  }
});

export const serviceDummyWithoutToken = axios.create({
  baseURL: REACT_APP_API_DUMMY_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});