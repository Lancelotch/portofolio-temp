import * as consts from './constants';
import axios from "axios"

const token = localStorage.getItem("token");

export const apiAddToCart = productSelected => ({
  type: consts.ADD_CART,
  payload: new Promise((resolve, reject) => {
    axios.post('https://api.monggopesen.com/cart-services/v1/cart/user/', { productSelected }, {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
});

export const updateCartContentQty = (qty) => ({
  type: consts.UPDATE_CART_CONTENT_QTY,
  payload: qty
});
