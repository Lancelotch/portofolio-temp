import httpClient from "../config/httpClient";
import urls from "../urls";


const apiProductByCategory = (request) => {    
    return new Promise((resolve, reject) => {
      httpClient.mainService
        .request({
          method: "GET",
          url: urls.GetProductByCategory+request,
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

const serviceProduct = {
    apiProductByCategory : apiProductByCategory
}

export default serviceProduct;