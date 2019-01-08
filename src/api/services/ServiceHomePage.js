import urls from "../urls";
import axios from "axios";

export const apiGetProductByCategory = (categoryId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: urls.mainServices + urls.GetProductByCategory + categoryId
    }).then(response => {
        resolve(response.data);
    }).catch(error => {
        reject(error);
    });
  });
};