import * as consts from './constants';

export const login = (token) => ({
  type: consts.LOGIN,
  payload: token
});

export const logout = (token) => ({
  type: consts.LOGOUT,
  payload: token
});

