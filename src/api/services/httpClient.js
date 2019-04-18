import axios from "axios";
const REACT_APP_API_MAIN_SERVICE = process.env.REACT_APP_API_MAIN_SERVICE;
const REACT_APP_API_CART_SERVICE = process.env.REACT_APP_API_CART_SERVICE;
const REACT_APP_API_DUMMY_SERVICE = process.env.REACT_APP_API_DUMMY_SERVICE;

const token = localStorage.getItem("accessToken");
const tokenDummy = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVJZCI6IjVjYTNkMzY4LTQxNWMtNGY0ZC04Nzc1LTI3OWQ0ZWJhMzcwNyIsImF1ZCI6WyJtdy9tb25nZ29wZXNlbkFwcCIsIm1zL3N1cGVyYWRtaW4iLCJtcy91c2VyIl0sInVzZXJfbmFtZSI6ImFkbUBtb25nZ29wZXNlbi5jb20iLCJzY29wZSI6WyJ3cml0ZSIsInJlYWQiLCJ0cnVzdCJdLCJleHAiOjE1OTczOTM4NjEsImF1dGhvcml0aWVzIjpbIjVjYTNkMzY4LTQxNWMtNGY0ZC04Nzc1LTI3OWQ0ZWJhMzcwNyIsIkFETSJdLCJqdGkiOiJlODFhNzA0NC0yZDc0LTQ0Y2UtOWUzYy01NmM3ZTdlMGEyZTkiLCJlbWFpbCI6ImFkbUBtb25nZ29wZXNlbi5jb20iLCJjbGllbnRfaWQiOiJtb25nZ29wZXNlbkFwcCJ9.EzZnk9bNfF8SlgeCRO5dfGVJpQJdEkxW721iOKHOlZjKhyI-YqxXMXzlD55Qzrn1hIa1iKZ0UeM6Rp4sRMvGa1WbfCBN8H51yycaZjmH7p0x9qcisz7YpJAobbxpueINH8XTis3EUBh2gEiWnVBeAdqpLvl4N4krYO7hPnYYh8kSKrfZR9xtgmwhaRGJrobUNLiQ0KR26tYM4zy_HySgfjo_aRMXg9P_fLN_P_3oYb_qsdfYDvyB4AuWa0SCH_6Wzsoi_r3KxYNo_GXy5Nlajn7gM71Y_ObGlftFK3NUxuRjzj2Ax9tLGTBHKzf24KlFvFs4tpzEy0RthFGpRv8cXw";

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
  baseURL: 'http://6f05be77.ngrok.io/api/v1/',
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