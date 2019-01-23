import httpClient  from "../config/httpClient"
import urls from "../urls"

export const apiGetCourier = (request) => {    
  return new Promise((resolve, reject) => {
    httpClient.mainService
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