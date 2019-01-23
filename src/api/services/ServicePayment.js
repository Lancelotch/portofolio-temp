import httpClient from "../config/httpClient";
import urls from "../urls";

const apiCreatePayment = (request) => {    
    return new Promise((resolve, reject) => {
      httpClient.mainService
        .request({
          method: "POST",
          url: urls.CreatePayment,
          data: request
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

const servicePayment = {
    createPayment : apiCreatePayment
}

export default servicePayment;