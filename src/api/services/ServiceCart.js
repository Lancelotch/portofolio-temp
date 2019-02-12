import httpClients from "./httpClients";
import urls from "../urls"

export const apiAddToCart = productSelected => {
  return new Promise((resolve, reject) => {
    httpClients.cartService
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

export const apiGetProductsFromCart = () => {
  return new Promise((resolve, reject) => {
    httpClients.cartService
      .request({
        method: "GET",
        url: urls.getProductsFromCart
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const apiUpdateProductFromCart = updateProducts => {
  return new Promise((resolve, reject) => {
    httpClients.cartService
      .request({
        method: "PATCH",
        url: urls.updateProductFromCart,
        data: updateProducts
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const apiDeleteProductFromCart = cartId => {
  return new Promise((resolve, reject) => {
    httpClients.cartService
      .request({
        method: "DELETE",
        url: urls.deleteProductFromCart,
        data: cartId
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const apiGetOrderId = () => {
  return new Promise((resolve, reject) => {
    httpClients.mainService
      .request({
        method: "GET",
        url: urls.GenerateOrderId
      })
      .then(response => {          
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
