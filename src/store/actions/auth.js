import axios from 'axios'
import urls from '../../api/urls';

export const isExpired = (token) => ({
  type : 'IS_EXPIRED',
  payload : axios.get(urls.cartServices+urls.getProductsFromCart,{
    headers: {
      Authorization: "Bearer " + token
    }
  })
})

export const login = (token) => ({
  type: "LOGIN",
  payload: token
});

export const logout = (token) => ({
  type: "LOGOUT",
  payload: token
});
  
