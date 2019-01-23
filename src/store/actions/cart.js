import axios from "axios"


export const actionAddCart = (productSelected, token) => ({
    action : 'ADD_CART' ,
    payload : axios.post('https://api.monggopesen.com/cart-services/v1/cart/user/', productSelected, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
})

export const updateCartContentQty = (qty) => ({
    type: 'UPDATE_QTY',
    payload: qty
  });