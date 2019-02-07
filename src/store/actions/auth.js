import axios from 'axios'
import urls from '../../api/urls';
import authentication from '../../api/services/authentication';
import dispatchType from './dispatchType';

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
  
export const activationCustomer = (request) => (dispatch) => {
  console.log({idActive : request});
  
  authentication.activatingCustomer(request).then(response=>{
    console.log({response : response});
    const authData = response.data;
    dispatch(dispatchType.activationUser(authData));
  }).catch(error=>{
    console.log(error);
    
  })
}