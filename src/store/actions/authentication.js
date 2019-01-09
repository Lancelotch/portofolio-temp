import cartService from "../../api/services/cart";
import dispatchTypes from "./dispatchTypes";

export const isTokenExpired = token => dispatch => {
    cartService
    .getCart()
    .then(response => {
      dispatch(dispatchTypes.login(token));
    })
    .catch(error => {
      console.log(error);
      if (error.status === 401) {
        dispatch(dispatchTypes.logout());
      }
    });
};

export const logout = () => dispatch => {
    dispatch(dispatchTypes.logout())
}