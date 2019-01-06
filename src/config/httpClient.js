import axios from "axios";
import urls from "../api/urls";

const token = localStorage.getItem("token");
console.log(token);


const mainService = axios.create({
  baseURL: urls.mainServices,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});


const httpClient = {
    mainService : mainService,
}
  
  export default httpClient;