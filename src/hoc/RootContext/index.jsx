import React, { useState, useReducer, useContext } from "react";
import { apiPostWithoutToken } from "../../services/api";
//import { PATH_AUTHENTICATION } from "../../services/path/login";
import { withRouter } from "react-router-dom";
import { PATH_PUBLIC } from "../../api/path";
const CreateRootContext = React.createContext();

const RootContext = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialState = {
    isAuthenticated: false,
    body: {}
  };
  
  const prevAuthenticated =
  JSON.parse(window.localStorage.getItem("authenticated")) || initialState;
  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          isAuthenticated: true,
          body: { ...action.payload }
        };
      case "logout":
        return {
          ...state,
          isAuthenticated: false,
          body: null
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, prevAuthenticated);
  const login = async payload => {
    try {
      setIsSubmitting(true);
      const response = await apiPostWithoutToken(
        PATH_PUBLIC.PUBLIC_USER_LOGIN,
        payload
      );
      if (response) {
        const token = response.data.data.access_token;
        window.localStorage.setItem("authenticated",JSON.stringify({ isAuthenticated: true, body: { token: token }}));
        dispatch({
          type: "login",
          payload: { token: token }
        });
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const register = async payload => {
    try {
      setIsSubmitting(true);
      const response = await apiPostWithoutToken(
        PATH_PUBLIC.PUBLIC_USER_REGISTER,
        payload
      );
      if (response) {
        const token = response.data.data.access_token;
        window.localStorage.setItem("authenticated",JSON.stringify({ isAuthenticated: true, body: { token: token }}));
        dispatch({
          type: "login",
          payload: {token: token}
        });
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    window.localStorage.setItem(
      "authenticated",JSON.stringify(initialState));
      dispatch({
        type: "logout"
      })

  }
  return (
    <CreateRootContext.Provider
      value={{
        ...state,
        handleLogin: payload => {
          login(payload);
        },
        handleRegister: payload => {
          register(payload);
        },
        handleLogout: () =>{
          logout()
        },
        isSubmitting,
        history: props.history
      }}
    >
      {props.children}
    </CreateRootContext.Provider>
  );
};
const useRootContext = () => useContext(CreateRootContext);
export default (withRouter)(RootContext);
export { CreateRootContext, useRootContext };
