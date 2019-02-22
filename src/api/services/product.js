import { PATH_PRODUCT } from "../path";
import { dummyService } from "./httpClient";

const listProductCategory = page => {
  return new Promise((resolve, reject) => {
    dummyService
      .request({
        method: "GET",
        //url: `${PATH_PRODUCT.PRODUCT}?limit=8&page=${page}`
        url: `listProduct/dsad`
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

const listProductSearch = request => {
  const quote = request.quote;
  const page = request.page;
  return new Promise((resolve, reject) => {
    dummyService
      .request({
        method: "GET",
        url: `${PATH_PRODUCT.PRODUCT_SEARCH}${quote}?limit=60&page=${page}`
        //url: `listProduct/dsad`
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

const product = {
  listProductCategory: listProductCategory,
  listProductSearch: listProductSearch
};

export default product;