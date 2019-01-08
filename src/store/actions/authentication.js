import { LOGIN, LOGOUT } from "./types";
import cartService from "../../api/services/cart";

export const isTokenExpired = token => dispatch => {
    cartService
    .getCart()
    .then(response => {
      console.log(response);
      
      dispatch({
        type: LOGIN,
        payload: token
      });
    })
    .catch(error => {
      if (error.status === 401) {
        dispatch({
          type: LOGOUT
        });
      }
    });
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}