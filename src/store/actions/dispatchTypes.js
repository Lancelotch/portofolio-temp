import { LOGIN, LOGOUT } from "./types";

const login = token => {
  return {
    type: LOGIN,
    payLoad: token
  };
};

const logout = () => {
  return {
    type: LOGOUT
  };
};

const dispatchTypes = {
  login: login,
  logout: logout
};

export default dispatchTypes;
