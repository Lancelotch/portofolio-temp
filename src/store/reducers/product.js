import TYPE from "../actions/type";

const initialState = {
  productList: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload
      };
    default:
      return state;
  }
};
