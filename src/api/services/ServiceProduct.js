import httpClients from "./httpClients";
import urls from "../urls";


const apiProductByCategory = (request) => {    
    return new Promise((resolve, reject) => {
      httpClients.mainService
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