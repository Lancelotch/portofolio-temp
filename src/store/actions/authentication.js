import authentication from "../../api/services/authentication";
import dispatchType from "./dispatchType";

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

export const loginWithForm = request => async dispatch => {
  try {
    const responseLoginForm = await authentication.loginWithForm(request);
    console.log(responseLoginForm)
    dispatch(dispatchType.loginWithForm(responseLoginForm))
    const token = responseLoginForm.data.access_token;
    const expiredToken = responseLoginForm.data.refresh_token
        localStorage.setItem('accessToken', token)
        localStorage.setItem('refreshToken', expiredToken)

  } catch (error) {
    console.log(error)
  }
}

export const activatingUser = (request) => async dispatch => {
  try{
    const responseActivatingUser = await authentication.activatingUser(request);
    dispatch(dispatchType.activationUser(responseActivatingUser));
    //history.push("/");
  }catch(error){
    console.log(error);
  }
};

export const logout = () => dispatch => {
  dispatch(dispatchType.logout());
};
