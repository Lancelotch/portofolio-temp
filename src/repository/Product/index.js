import { apiGetWithoutToken } from "../../services/api";
import { PATH_PRODUCT } from "../../services/path/product";
import jmespath from 'jmespath';
import products from './response/products';

async function getAll(props) {
  const loading = props.loading ? props.loading : function() {};
  const request = props.request;
  let response = "";
  loading(true);
  try {
    response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT, request);
    response = jmespath.search(response, products);
    loading(false);
  } catch (error) {
    response = jmespath.search(error.response, products);
    loading(false);
  }
  return response;
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
    response = jmespath.search(response, products);
    loading(false);
  } catch (error) {
    response = jmespath.search(error.response, products);
    loading(false);
  }
  return response;
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
    response = jmespath.search(response, products);
    loading(false);
  } catch (error) {
    response = jmespath.search(error.response, products);
    loading(false);
  }
  return response;
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
    console.log(response);
    response = jmespath.search(response, products);
    console.log(response);
    loading(false);
  } catch (error) {
    response = jmespath.search(error.response, products);
    loading(false);
  }
  return response;
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
      loading(false);
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
