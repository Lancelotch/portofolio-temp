    
import httpClient  from "config/httpClient";
import urls from "../urls";

export const apiAddToCart = productSelected => {  
  return new Promise((resolve, reject) => {
    httpClient.httpClientCart
      .request({
        method: "POST",
        url: urls.addToCart,
        data: productSelected
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

