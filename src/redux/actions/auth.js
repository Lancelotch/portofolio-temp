import axios from 'axios'

export const isExpired = (token) => ({
  type : 'IS_EXPIRED',
  payload : axios.get('https://api.monggopesen.com/cart-services/v1/cart/user/',{
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

