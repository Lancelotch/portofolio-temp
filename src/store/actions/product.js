import product from "../../api/services/product";
import dispatchType from "./dispatchType";

export const getProductList = (fromPage, request) => async dispatch => {
  let productList = [];
  try {
    fromPage !== 'search' ? 
    productList = await product.listProductCategory(request) : 
    productList = await product.listProductSearch(request);
    dispatch(dispatchType.products(productList));
  } catch (error) {
    console.log(error);
  }
};