import React, { useState, useReducer, useContext } from "react";
import { withRouter } from "react-router-dom";
import authentication from "../../repository/Authentication";
const CreateRootContext = React.createContext();

const RootContext = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialState = {
    isAuthenticated: false,
    authBody: {}
  };

  const prevAuthenticated =
    JSON.parse(window.localStorage.getItem("authenticated")) || initialState;
  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          isAuthenticated: true,
          authBody: { ...action.payload }
        };
      case "logout":
        return {
          ...state,
          isAuthenticated: false,
          authBody: null
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, prevAuthenticated);
  const login = async payload => {
    try {
      setIsSubmitting(true);
      const response = await authentication.login({param: payload});
      if (response.status === 200) {
        const token = response.data.data.access_token;
        window.localStorage.setItem(
          "authenticated",
          JSON.stringify({ isAuthenticated: true, authBody: response.data.data })
        );
        window.localStorage.setItem("token", token);
        dispatch({
          type: "login",
          payload: response.data.data
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
      const response = await authentication.register({param: payload});
      if (response.status === 200) {
        const token = response.data.data.access_token;
        window.localStorage.setItem(
          "authenticated",
          JSON.stringify({ isAuthenticated: true, authBody: response.data.data })
        );
        window.localStorage.setItem("token", token);
        dispatch({
          type: "login",
          payload: response.data.data
        });
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("authenticated");
    window.localStorage.removeItem("token");
    dispatch({
      type: "logout"
    });
  };
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
        handleLogout: () => {
          logout();
        },
        isSubmitting,
        history: props.history,
        match: props.match
      }}
    >
      {props.children}
    </CreateRootContext.Provider>
  );
};
const useRootContext = () => useContext(CreateRootContext);
export default withRouter(RootContext);
export { CreateRootContext, useRootContext };
