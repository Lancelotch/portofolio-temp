import authentication from '../../api/services/authentication';
import dispatchType from './dispatchType';

export const loginWithGoogle = (history, request) => (dispatch) =>{
  authentication.loginWithGoogle(request)
  .then(response=>{
    console.log(response);
      dispatch(dispatchType.loginWithGoogle(response));
      history.push('/');
  })
  .catch(error=>{
    console.log(error);
  })
};

export const activatingUser = (history, request) => (dispatch) =>{
  authentication.activatingUser(request)
  .then(response=>{
    console.log(response);
      dispatch(dispatchType.activationUser(response));
      history.push('/');
  })
  .catch(error=>{
    console.log(error);
  })
};

export const logout = () => (dispatch) => {
  dispatch(dispatchType.logout());
};