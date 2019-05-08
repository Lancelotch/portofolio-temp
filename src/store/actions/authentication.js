import authentication from "../../api/services/authentication";
import dispatchType from "./dispatchType";
import history from "../../routers/history"

export const registerWithGoogle = (history, request) => async dispatch => {
  try {
    const responseLoginGoogle = await authentication.loginWithGoogle(request);
    dispatch(dispatchType.loginWithGoogle(responseLoginGoogle));
    history.push('/');
  } catch (error) {
    console.log("ini error di registerWithGoogle actions",error);
  }
};

export const loginWithGoogle = (path, response) => async dispatch => {
  try {
    const responseLoginGoogle = await authentication.loginWithGoogle(response);
    dispatch(dispatchType.loginWithGoogle(responseLoginGoogle));
    console.log("ini history di login action google",path)
    history.push(path)
  } catch (error) {
    console.log("ini error di login with google",error);
  }
};

export const loginWithHome = (request,path,history) => async dispatch => {
  try {
    const responseLoginForm = await authentication.loginWithForm(request);
    dispatch(dispatchType.loginWithForm(responseLoginForm))
    const token = responseLoginForm.data.access_token;
    const expiredToken = responseLoginForm.data.refresh_token
    localStorage.setItem('accessToken', token)
    localStorage.setItem('refreshToken', expiredToken)
    history.push(path)
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

export const registerForm = (history, request, path) => async dispatch => {
  dispatch(dispatchType.handleLoading())
  try {
    const responseRegisterForm = await authentication.registerWithForm(request);
    dispatch(dispatchType.registerWithForm(responseRegisterForm.data));
    const token = responseRegisterForm.data.access_token;
    const expiredToken = responseRegisterForm.data.refresh_token
    localStorage.setItem('accessToken', token)
    localStorage.setItem('refreshToken', expiredToken)
    history.push(path);
  } catch (error) {
    console.log(error.data.message)
    dispatch(dispatchType.registerFailed(error.data.message))
  }
}

export const openModal = () => dispatch => {
  dispatch(dispatchType.openModal())
  setTimeout(() => {
    dispatch(dispatchType.closeModal())
  }, 3000)
}

export const closeModal = () => dispatch => {
  dispatch(dispatchType.closeModal())
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