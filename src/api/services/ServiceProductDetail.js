import Axios from "axios";
import urls from "../urls";

export const apiGetProductById = productId => {

return new Promise((resolve, reject) => {
    Axios({
      method: "GET",
      url: urls.mainServices + urls.GetProductById + productId
    }).then(response => {
        resolve(response.data);
    }).catch(error => {
        reject(error);
    });
  });
};