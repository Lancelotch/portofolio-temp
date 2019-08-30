import axios from "axios";
const REACT_APP_API_SERVICE = process.env.REACT_APP_API_MAIN_SERVICE;

function getToken() {
  return JSON.parse(window.localStorage.getItem("authenticated")).body;
}

export const serviceWithToken = (token = getToken().token) => axios.create({
  baseURL: REACT_APP_API_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});

export const serviceWithoutToken = () => axios.create({
  baseURL: REACT_APP_API_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    "Content-Type": `application/json`,
  }
});