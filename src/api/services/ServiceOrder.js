import httpClient from "../config/httpClient"
import urls from "../urls"

const apiAddOrder = (request) => {    
    return new Promise((resolve, reject) => {
      httpClient.mainService
        .request({
          method: "POST",
          url: urls.AddOrder,
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

const serviceOrder = {
    addOrder : apiAddOrder
}

export default serviceOrder;