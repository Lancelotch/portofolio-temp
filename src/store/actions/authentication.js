import authentication from "../../api/services/authentication";
import dispatchType from "./dispatchType";
import history from "../../routers/history"
import {apiGetWithoutToken} from "../../api/services/index"
import {PATH_PUBLIC} from "../../api/path"
import customer from "../../api/services/customer"

export const registerWithGoogle = (history, request) => async dispatch => {
  try {
    const responseLoginGoogle = await authentication.loginWithGoogle(request);
    dispatch(dispatchType.loginWithGoogle(responseLoginGoogle));
    const token = responseLoginGoogle.data.access_token;
    const expiredToken = responseLoginGoogle.data.refresh_token
    localStorage.setItem('accessToken', token)
    localStorage.setItem('refreshToken', expiredToken)
    const dataCustomer = await customer.customerDetail()
    dispatch(dispatchType.getCustomerName(dataCustomer.data.name))
    history.push('/');
  } catch (error) {
    console.log("ini error di registerWithGoogle actions",error);
  }
};

export const loginWithGoogle = (path, response) => async dispatch => {
  if(response) {
    try {
      const responseLoginGoogle = await authentication.loginWithGoogle(response);
      dispatch(dispatchType.loginWithGoogle(responseLoginGoogle));
      const token = responseLoginGoogle.data.access_token;
      const expiredToken = responseLoginGoogle.data.refresh_token
      localStorage.setItem('accessToken', token)
      localStorage.setItem('refreshToken', expiredToken)
      const dataCustomer = await customer.customerDetail()
      dispatch(dispatchType.getCustomerName(dataCustomer.data.name))
      history.push(path)
    } catch (error) {
      console.log("ini error di login with google",error);
    }
  }
};

export const loginWithFacebook = (response, path) => async dispatch => {
  if(response){
    try {
      const responseLoginFacebook = await authentication.loginWithFacebook(response)
      dispatch(dispatchType.loginWithGoogle(responseLoginFacebook));
      const token = responseLoginFacebook.data.access_token;
      const expiredToken = responseLoginFacebook.data.refresh_token
      localStorage.setItem('accessToken', token)
      localStorage.setItem('refreshToken', expiredToken)
      const dataCustomer = await customer.customerDetail()
      dispatch(dispatchType.getCustomerName(dataCustomer.data.name))
      history.push(path)
    }catch(error){
      console.log("ini error di facebook", error)
    }
  }

}

export const loginWithHome = (request,path,history) => async dispatch => {
  try {
    const responseLoginForm = await authentication.loginWithForm(request);
    await dispatch(dispatchType.loginWithForm(responseLoginForm))
    const token = responseLoginForm.data.access_token;
    const expiredToken = responseLoginForm.data.refresh_token
    localStorage.setItem('accessToken', token)
    localStorage.setItem('refreshToken', expiredToken)
    const dataCustomer = await customer.customerDetail()
    dispatch(dispatchType.getCustomerName(dataCustomer.data.name))
   // history.push(path)
  } catch (error) {
    if(error.data){
      if(error.data.errors){
        const msg = error.data.errors[0].defaultMessage
        dispatch(dispatchType.loginFailed(msg))
      }else{
        const msg = error.data.message
        dispatch(dispatchType.loginFailed(msg))
      }
    }
    
  }
}

export const loginWithForm = (history, request, nextPage = "/") => async dispatch => {
  try {
    const responseLoginForm = await authentication.loginWithForm(request);
    dispatch(dispatchType.loginWithForm(responseLoginForm))
    const token = responseLoginForm.data.access_token;
    const expiredToken = responseLoginForm.data.refresh_token
    localStorage.setItem('accessToken', token)
    localStorage.setItem('refreshToken', expiredToken)
    history.push(nextPage);
  } catch (error) {
    dispatch(dispatchType.loginWithForm(error))
  }
}

export const registerForm = (history, request, path) => async dispatch => {
  dispatch(dispatchType.handleLoading())
  try {
    const responseRegisterForm = await authentication.registerWithForm(request);
    dispatch(dispatchType.registerWithForm(responseRegisterForm.data));
    const token = responseRegisterForm.data.access_token;
    const expiredToken = responseRegisterForm.data.refresh_token
    localStorage.setItem('accessToken', token)
    localStorage.setItem('refreshToken', expiredToken)
    const dataCustomer = await customer.customerDetail()
    dispatch(dispatchType.getCustomerName(dataCustomer.data.name))
    history.push(path);
  } catch (error) {
    dispatch(dispatchType.registerFailed(error.data.message))
  }
}

export const openModal = () => dispatch => {
  dispatch(dispatchType.openModal())
}

export const closeModal = () => dispatch => {
  dispatch(dispatchType.closeModal())
}

export const clearError = () => dispatch => {
  dispatch(dispatchType.clearError())
}


export const activatingUser = (request) => async dispatch => {
  try {
    const url = PATH_PUBLIC.PUBLIC_USER_ACTIVED + request
    // console.log(api)
    const responseActivatingUser = await apiGetWithoutToken(url);
    dispatch(dispatchType.activationUser(responseActivatingUser));
    //history.push("/");
  } catch (error) {
    console.log("ini error di redux activatinguser",error);
    dispatch(dispatchType.activationError(error))
  }
};

export const logout = () => dispatch => {
  try {
    dispatch(dispatchType.logout());
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

  } catch (error) {
    console.log(error)
  }
};

export const loading = () => dispatch => {
  dispatch(dispatchType.logout());
}