import urls from "../urls";
import httpClients from "./httpClients";

const getDetailUser = () => {    
  return new Promise((resolve, reject) => {
    httpClients.mainService
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

const updateDetailUser = (request) => {    
  return new Promise((resolve, reject) => {
    httpClients.mainService
      .request({
        method: "PUT",
        url: urls.DetailUser,
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
  getDetailUser : getDetailUser,
  updateDetailUser : updateDetailUser
}

export default serviceUser