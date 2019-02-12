import axios from "axios";
import urlsDummy from "../urlsDummy";
const API_URL = process.env.REACT_APP_API_MAIN_SERVICE;
const API_CART = process.env.REACT_APP_API_CART_SERVICE;

const token = localStorage.getItem("token");

const mainService = axios.create({
  baseURL: API_URL,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});

const cartService = axios.create({
  baseURL: API_CART,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});

const dummyService = axios.create({
  baseURL: urlsDummy.mainServiceLocal,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});


const httpClients = {
    mainService : mainService,
    cartService : cartService,
    dummyService : dummyService
}
  
export default httpClients;