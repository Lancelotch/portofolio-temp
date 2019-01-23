import cartService from "api/services/cart";

import * as consts from './constants';

export default {
  onLogin: ({
    dispatch
  }) => next => action => {
    next(action);

    if (action.type === consts.LOGIN) {
      cartService.getCart().then(response => {
        dispatch({
          type: consts.LOGIN,
          payload: action.payload,
        });
      }).catch(error => {
        console.log(error);
        if (error.status === 401) {
          dispatch({
            type: consts.LOGOUT,
            payload: action.payload,
          });
        }
      });
    }
  },

};
