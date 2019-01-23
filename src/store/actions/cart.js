import axios from "axios"
import urls from "../../api/urls";


export const actionAddCart = (productSelected, token) => ({
    action : 'ADD_CART' ,
    payload : axios.post(urls.cartServices+urls.addToCart, productSelected, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
})

export const updateCartContentQty = (qty) => ({
    type: 'UPDATE_QTY',
    payload: qty
  });