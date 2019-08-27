import { apiGetWithoutToken } from "../../api/services";
import { PATH_PRODUCT } from "../../api/path";
import { serviceWithoutToken } from "../../api/services/httpClient";


async function getLimit(props) {
    const loading = props.loading ? props.loading : function() {};
    let response = ""
    loading(true);
    try {
        response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT_ALL_LIMIT);
        loading(false)
        return response
    } catch (error) {
        loading(false)
        return error
    }
};

async function getAll(props){
    const loading = props.loading ? props.loading : function(){};
    let response = ""
    loading(true)
    try {
        response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT)
        loading(false)
        return response
    } catch (error){
        loading(false)
        return error 
    }
}

async function getByCategory( props ){
    return new Promise((resolve, reject) => {
        serviceWithoutToken()
          .request({
            method: "GET",
            url: `${PATH_PRODUCT.PRODUCT_CATEGORY}${props.categoryId}?limit=20&page=${props.page}&sortBy=${props.sortBy}&direction=${props.direction}`
          })
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error.response);
          });
      });
}

const Product = {
    getLimit: getLimit,
    getAll: getAll,
    getByCategory: getByCategory
}

export default Product;