import axios from "axios";
import urls from "../urls";
import urlsDummy from "../urlsDummy";

const token = localStorage.getItem("token");
console.log(token);

const mainService = axios.create({
  baseURL: urls.mainServices,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});

const httpClientCart = axios.create({
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
    httpClientCart : httpClientCart,
    dummyService : dummyService
}
  
export default httpClient;