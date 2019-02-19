import { PATH_PRODUCT } from '../path';
import { dummyService } from './httpClient';

const listProductCategory = page =>{
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
  }

  const product = {
    listProductCategory : listProductCategory
  }

  export default product;