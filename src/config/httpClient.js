import axios from "axios";
import urls from "../api/urls";
import urlsDummy from "../api/urlsDummy";

const token = localStorage.getItem("token");
console.log(token);

const mainService = axios.create({
  baseURL: urls.mainServices,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});

const cartServices = axios.create({
  baseURL: urls.cartServices,
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

const httpClient = {
    mainService : mainService,
    cartServices : cartServices,
    dummyService : dummyService
}
  
export default httpClient;
