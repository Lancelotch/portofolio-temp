import { PATH_PRODUCT } from "../path";
import { dummyService } from "./httpClient";

const listProductCategory = request => {
  const categoryId = request.categoryId;
  const page = request.page;
  return new Promise((resolve, reject) => {
    dummyService
      .request({
        method: "GET",
        url: `${PATH_PRODUCT.PRODUCT_CATEGORY}${categoryId}?limit=208&page=${page}`
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

const popularProduct = request => {
  return new Promise((resolve, reject) => {
    dummyService
      .request({
        method:'GET',
        url: PATH_PRODUCT.PRODUCT_BY_ID
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

const listProductSearch = request => {
  const query = request.query;
  const page = request.page;
  const sortBy = request.sortBy;
  const direction = request.direction;
  return new Promise((resolve, reject) => {
    dummyService
      .request({
        method: "GET",
        url: `${PATH_PRODUCT.PRODUCT_SEARCH}${query}?limit=20&page=${page}&sortBy=${sortBy}&direction=${direction}`
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response.data);
      });
  });
};

const bestSellerProduct = request => {
  return new Promise((resolve, reject) => {
    dummyService
      .request({
        method:'GET',
        url: PATH_PRODUCT.PRODUCT_BY_ID
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

const mostClickProduct = request => {
  return new Promise((resolve, reject) => {
    dummyService
      .request({
        method:'GET',
        url: PATH_PRODUCT.PRODUCT_BY_ID
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

const product = {
  listProductCategory: listProductCategory,
  listProductSearch: listProductSearch,
  popularProduct: popularProduct,
  bestSellerProduct: bestSellerProduct,
  mostClickProduct: mostClickProduct
};

export default product;
