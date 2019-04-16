import { PATH_PRODUCT } from "../path";
import { dummyService } from "./httpClient";

const listProductCategory = ({categoryId,page, sortBy, direction}) => {
  return new Promise((resolve, reject) => {
    dummyService
      .request({
        method: "GET",
        url: `${PATH_PRODUCT.PRODUCT_CATEGORY}${categoryId}?limit=20&page=${page}&sortBy=${sortBy}&direction=${direction}`
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

const listProductSearch = ({query,page, sortBy, direction}) => {
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
        reject(error.response);
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

const products = ({page,limit}) =>{
  return new Promise((resolve, reject) => {
    dummyService
      .request({
        method: "GET",
        url: `${PATH_PRODUCT.PRODUCT}?limit=${limit}&page=${page}`
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
}

const product = {
  listProductCategory: listProductCategory,
  listProductSearch: listProductSearch,
  popularProduct: popularProduct,
  bestSellerProduct: bestSellerProduct,
  mostClickProduct: mostClickProduct,
  products: products
};

export default product;
