import { apiGetWithoutToken, apiPostWithToken } from "../../services/api";
import { PATH_PRODUCT } from "../../services/path/product";
import jmespath from "jmespath";
import products from "./response/products";

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
    limit: 7
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
    limit: 5
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
    response = jmespath.search(response, products);
    loading(false);
  } catch (error) {
    response = jmespath.search(error.response, products);
    loading(false);
  }
  return response;
}

async function getByKeyword(props) {
  const loading = props.loading ? props.loading : function() {};
  const params = props.request;
  let response = "";
  loading(true);
  try {
    response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT_SEARCH, params);
    response = jmespath.search(response, products);
    loading(false);
    return response;
  } catch (error) {
    response = jmespath.search(error.response, products);
    loading(false);
    return error;
  }
}

async function get(props) {
  const loading = props.loading ? props.loading : function() {};
  const productId = props.productId;
  let response = "";
  loading(true);
  try {
    response = await apiGetWithoutToken(`${PATH_PRODUCT.PRODUCT}/${productId}`);
    loading(false);
  } catch (error) {
    loading(false);
    response = error;
  }
  return response;
}

async function getCreateReview(props){
  const loading = props.loading ? props.loading : function() {};
  const productId = props.productId;
  const params = props.params
  let response = "";
  loading(true);
  try{
    response = await apiPostWithToken(`${PATH_PRODUCT.PRODUCT}/${productId}/${"review"}`, params)
    loading(false);
  } catch(error){
    loading(false);
    response = error;
  }
  return response;
}

const Product = {
  getCreateReview:getCreateReview,
  getAll: getAll,
  getPopular: getPopular,
  getBestSeller: getBestSeller,
  getByCategory: getByCategory,
  getByKeyword: getByKeyword,
  get: get
};

export default Product;
