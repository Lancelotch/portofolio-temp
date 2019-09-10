import React, { useState, useReducer, useContext } from "react";
import { withRouter } from "react-router-dom";
import authentication from "../../repository/Authentication";
import Customer from "../../repository/Customer";
const CreateRootContext = React.createContext();

const RootContext = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialState = {
    isAuthenticated: false,
    authBody: {},
    authProfile: {}
  };

  const prevAuthenticated =
    JSON.parse(window.localStorage.getItem("authenticated")) || initialState;
  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          isAuthenticated: action.isAuthenticated,
          authBody: { ...action.payload }
        };
      case "logout":
        return {
          ...state,
          isAuthenticated: false,
          authBody: {},
          authProfile: {}
        };
      case "update":
        return {
          ...state,
          authProfile: { ...action.payload }
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, prevAuthenticated);
  const login = async payload => {
    const response = await authentication.login({
      param: payload,
      loading: setIsSubmitting
    });
    actionRegisterLogin(response);
  };

  const register = async payload => {
    const response = await authentication.register({
      param: payload,
      loading: setIsSubmitting
    });
    actionRegisterLogin(response);
  };

  const update = async payload => {
    const response = await Customer.update({
      params: payload,
      loading: setIsSubmitting
    });
    if (response.status === 200) {
      getProfile();
    }
  };

  async function getProfile() {
    const response = await Customer.get({});
    const data = JSON.parse(window.localStorage.getItem("authenticated"));
    window.localStorage.setItem(
      "authenticated",
      JSON.stringify({
        ...data,
        authProfile: response.data.data
      })
    );
    dispatch({
      type: "update",
      payload: response.data.data
    });
  }

  function actionRegisterLogin(response) {
    let isAuthenticated = false;
    if (response.status === 200) {
      const token = response.data.data.access_token;
      if (token !== "") {
        isAuthenticated = true;
        window.localStorage.setItem(
          "authenticated",
          JSON.stringify({
            isAuthenticated: true,
            authBody: response.data.data
          })
        );
        window.localStorage.setItem("token", token);
        getProfile();
      }
    }
    dispatch({
      type: "login",
      isAuthenticated: isAuthenticated,
      payload:
        response.data && response.data.data ? response.data.data : response
    });
  }

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
        handleUpdate: payload => {
          update(payload);
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
