import * as consts from './constants';
import httpClient  from "../../config/httpClient";
import urls from "../../api/urls";

export default {
  onUpdateCartContentQty: ({
    dispatch
  }) => next => action => {
    next(action);

    if (action.type === consts.UPDATE_CART_CONTENT_QTY) {
      dispatch({
        type: consts.UPDATE_CART_CONTENT_QTY,
        payload: action.payload,
      });
    }
    // if (action.type === consts.ADD_CART) {
    //   dispatch({
    //     type: consts.ADD_CART,
    //     payload: new Promise((resolve, reject) => {
    //       httpClient.httpClientCart
    //         .request({
    //           method: "POST",
    //           url: urls.addToCart,
    //           data: action.payload
    //         })
    //         .then(response => {
    //           resolve(response.data);
    //         })
    //         .catch(error => {
    //           reject(error);
    //         });
    //     })
    //   });
    // }
  },

};
