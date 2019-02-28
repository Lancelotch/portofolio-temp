import axios from "axios";
const REACT_APP_API_MAIN_SERVICE = process.env.REACT_APP_API_MAIN_SERVICE;
const REACT_APP_API_CART_SERVICE = process.env.REACT_APP_API_CART_SERVICE;
const REACT_APP_API_DUMMY_SERVICE = process.env.REACT_APP_API_DUMMY_SERVICE;

const token = localStorage.getItem("accessToken");

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
  headers: {
    Authorization: "Bearer " + token
  }
});