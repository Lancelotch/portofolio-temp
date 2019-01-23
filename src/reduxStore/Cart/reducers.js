// import { fromJS } from 'immutable';
import * as consts from './constants';

const initialState = {
  contentQty: 0,
  isLoading: false,
  isFinish: false,
  isError: false,
  error: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case consts.ADD_CART + "_PENDING":
      return {
        ...state, isLoading: true
      }

    case consts.ADD_CART + "_FULFILLED":
      return {
        ...state, isLoading: false, isFinish: true
      }

    case consts.ADD_CART + "_REJECTED":
      return {
        ...state, isError: true,
        error: action.payload.data

      }

    case consts.UPDATE_CART_CONTENT_QTY + "_PENDING":
      return {
        ...state, isLoading : true,
      }

    case consts.UPDATE_CART_CONTENT_QTY + "_FULFILLED":
      return {
        ...state, isLoading: false, isFinish: true,
        contentQty : action.payload
      }

    case consts.UPDATE_CART_CONTENT_QTY + "_REJECTED":
      return {
        ...state, isError: true,
        error: action.payload.data,

      }
    
    default:
      return state;
  }
};
