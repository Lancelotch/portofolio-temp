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

export const activatingUser = (history, request) => async dispatch => {
  try{
    const responseActivatingUser = await authentication.activatingUser(request);
    dispatch(dispatchType.activationUser(responseActivatingUser));
    history.push("/");
  }catch(error){
    console.log(error);
  }
};

export const logout = () => dispatch => {
  dispatch(dispatchType.logout());
};
