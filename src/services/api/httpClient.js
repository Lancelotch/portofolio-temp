import axios from 'axios';
const REACT_APP_API_SERVICE = process.env.REACT_APP_API_MAIN_SERVICE;
const getToken = () => {
  return window.localStorage.getItem("token");
}

export const serviceWithToken = (token = getToken()) => axios.create({
  baseURL: REACT_APP_API_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": `application/json`
  }
});

export const serviceWithoutToken = () => axios.create({
  baseURL: REACT_APP_API_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    "Content-Type": `application/json`,
  }
});