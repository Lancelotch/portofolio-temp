import urls from "../urls";
import httpClient  from "config/httpClient";

const GetDetailUser = () => {    
  return new Promise((resolve, reject) => {
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.DetailUser
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

const UpdateDetailUser = (request) => {    
  return new Promise((resolve, reject) => {
    httpClient.mainService
      .request({
        method: "PUT",
        url: urls.detailUser,
        data : request
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

const serviceUser = {
  GetDetailUser : GetDetailUser,
  UpdateDetailUser : UpdateDetailUser
}

export default serviceUser