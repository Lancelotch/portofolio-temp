import urls from "../urls";
import httpClient from "../../config/httpClient";

const getCart = () => {
  return new Promise((resolve, reject) => {
    httpClient.cartServices
      .request({
        method: "GET",
        url: urls.cart
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
        
      });
  });
};

const postCart = request => {
    return new Promise((resolve, reject) => {
      httpClient.cartServices
        .request({
          method: "POST",
          url: urls.cart,
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

const cart = {
    getCart : getCart,
    postCart : postCart
}

export default cart;

