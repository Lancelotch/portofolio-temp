import axios from "axios";
import { api } from "api/api.js";

const token = localStorage.getItem("token");
console.log(token);


const httpClientMainService = axios.create({
  baseURL: api.API_URL_MAIN_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});

const httpClientCart = axios.create({
  baseURL: api.API_URL_CART,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});

const httpClientNgrok = axios.create({
  baseURL: api.API_URL_NGROK,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});

const httpClient = {
  httpClientMainService : httpClientMainService,
  httpClientCart : httpClientCart,
  httpClientNgrok : httpClientNgrok
}

export { httpClient };