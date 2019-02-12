import httpClients from "./httpClients";
import urls from "../urls";

export const apiGetCourier = (request) => {    
  return new Promise((resolve, reject) => {
    httpClients.mainService
      .request({
        method: "POST",
        url: urls.GetCourier,
        data: request
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};