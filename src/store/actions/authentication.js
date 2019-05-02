import authentication from "../../api/services/authentication";
import dispatchType from "./dispatchType";
import TYPE from "./type"
import storage from "redux-persist/es/storage";


export const registerWithGoogle = (history, request) => async dispatch => {
  try {
    const responseLoginGoogle = await authentication.loginWithGoogle(request);
    dispatch(dispatchType.loginWithGoogle(responseLoginGoogle));
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const loginWithGoogle = request => async dispatch => {
  try {
    const responseLoginGoogle = await authentication.loginWithGoogle(request);
    dispatch(dispatchType.loginWithGoogle(responseLoginGoogle));
  } catch (error) {
    console.log(error);
  }
};


export const loginWithHome = request => async dispatch => {
  try {
    const responseLoginForm = await authentication.loginWithForm(request);
    dispatch(dispatchType.loginWithForm(responseLoginForm))
    const token = responseLoginForm.data.access_token;
    const expiredToken = responseLoginForm.data.refresh_token
    localStorage.setItem('accessToken', token)
    localStorage.setItem('refreshToken', expiredToken)
  } catch (error) {
    if(error.data.errors){
      const msg = error.data.errors[0].defaultMessage
      dispatch(dispatchType.loginFailed(msg))
      setTimeout(() => {
        dispatch(dispatchType.logout());
      }, 4000)
    }else{
      const msg = error.data.message
      dispatch(dispatchType.loginFailed(msg))
      setTimeout(() => {
        dispatch(dispatchType.logout());
      }, 4000)
    }
  }
}

export const loginWithForm = (history, request, nextPage = "/") => async dispatch => {
  try {
    const responseLoginForm = await authentication.loginWithForm(request);
    console.log(responseLoginForm)
    dispatch(dispatchType.loginWithForm(responseLoginForm))
    const token = responseLoginForm.data.access_token;
    const expiredToken = responseLoginForm.data.refresh_token
    localStorage.setItem('accessToken', token)
    localStorage.setItem('refreshToken', expiredToken)
    history.push(nextPage);
  } catch (error) {
    console.log(error)
    dispatch(dispatchType.loginWithForm(error))
  }
}

export const registerForm = (history, request, nextPage = "/") => async dispatch => {
  dispatch(dispatchType.handleLoading())
  try {
    const responseRegisterForm = await authentication.registerWithForm(request);
    dispatch(dispatchType.registerWithForm(responseRegisterForm));
    const token = responseRegisterForm.data.access_token;
    const expiredToken = responseRegisterForm.data.refresh_token
    localStorage.setItem('accessToken', token)
    localStorage.setItem('refreshToken', expiredToken)
    history.push(nextPage);
  } catch (error) {
    console.log("register with form on error", error)
    const token = localStorage.getItem("accesToken")
    const expiredToken = localStorage.getItem("refreshToken")
    console.log("on error ", token, expiredToken)
    dispatch(dispatchType.registerWithForm(error))
  }
}


export const activatingUser = (request) => async dispatch => {
  try {
    const responseActivatingUser = await authentication.activatingUser(request);
    dispatch(dispatchType.activationUser(responseActivatingUser));
    //history.push("/");
  } catch (error) {
    console.log(error);
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