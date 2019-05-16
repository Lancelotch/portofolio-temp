import axios from "axios";
const REACT_APP_API_SERVICE = process.env.REACT_APP_API_DUMMY_SERVICE;

function getToken() {
  return localStorage.getItem("accessToken");
}

export const serviceWithToken = (token = getToken()) => axios.create({
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