import { apiGetWithoutToken } from "../../services/api";
import { PATH_PRODUCT } from "../../services/path/product";
import jmespath from 'jmespath';
import product from './response/product';

async function getAll(props) {
  const loading = props.loading ? props.loading : function() {};
  const request = props.request;
  let response = "";
  loading(true);
  try {
    response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT, request);
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

async function getPopular(props) {
  const loading = props.loading ? props.loading : function() {};
  const params = {
    limit: 4
  };
  let response = "";
  loading(true);
  try {
    response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT, params);
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

async function getBestSeller(props) {
  const loading = props.loading ? props.loading : function() {};
  const params = {
    limit: 4
  };
  let response = "";
  loading(true);
  try {
    response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT, params);
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

async function getByCategory(props) {
  const loading = props.loading ? props.loading : function() {};
  const params = props.objparams;
  const categoryId = props.categoryId;
  let response = "";
  loading(true);
  try {
    response = await apiGetWithoutToken(
      `${PATH_PRODUCT.PRODUCT_CATEGORY}/${categoryId}`,
      params
    );
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

async function getByKeyword(props) {
  const loading = props.loading ? props.loading : function() {};
  const params = props.request
  let response = "";
  loading(true);
  try {
    response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT_SEARCH, params);
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

async function get(props) {
  const loading = props.loading ? props.loading : function () { };
  const productId = props.productId;
  let response = ""
  loading(true)
  try {
      response = await apiGetWithoutToken(`${PATH_PRODUCT.PRODUCT}/${productId}`)
      console.log(response);
      const result = jmespath.search(response, product);
      console.log(result);
      loading(false)
  } catch (error) {
      loading(false)
      response = error;
  }
  return response;
};

const Product = {
  getAll: getAll,
  getPopular: getPopular,
  getBestSeller: getBestSeller,
  getByCategory: getByCategory,
  getByKeyword: getByKeyword,
  get:get
};

export default Product;
