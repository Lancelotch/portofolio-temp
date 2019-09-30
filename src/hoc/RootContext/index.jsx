import React, { useState, useReducer, useContext, Fragment } from "react";
import authentication from "../../repository/Authentication";
import Customer from "../../repository/Customer";
import Alert from "../../components/Alert";
import { useTranslation, Trans } from "react-i18next";
const CreateRootContext = React.createContext();

const RootContext = props => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(null);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState('')
  const [showIcon, setShowIcon] = useState(false)
  const [animation, setAnimation] = useState('')
  const initialState = {
    isAuthenticated: false,
    authBody: {},
    authProfile: {},
  };
  const [authResponse, setAuthResponse] = useState({})
  const { t , i18n } = useTranslation();
  const translate = t;

  const changeLanguage = function(language) {
    i18n.changeLanguage(language);
  };


  const prevAuthenticated =
    JSON.stringify(window.localStorage.getItem("authenticated")) || initialState;
    
  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          isAuthenticated: action.isAuthenticated,
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
      loading: setIsSubmitLoading
    });
    actionAfterRegisterOrLogin(response);
  };

  const register = async payload => {
    const response = await authentication.register({
      param: payload,
      loading: setIsSubmitLoading
    });
    actionAfterRegisterOrLogin(response);
  };

  const update = async payload => {
    const response = await Customer.update({
      params: payload,
      loading: setIsSubmitLoading
    });
    if (response.status === 200) {
      getProfile();
    }
  };

  async function getProfile() {
    const response = await Customer.get({});
    window.localStorage.setItem(
      "authenticated",
      JSON.stringify({
        authProfile: response.data.data
      })
    );
    dispatch({
      type: "update",
      payload: response.data.data
    });
  }

  function actionAfterRegisterOrLogin(response) {
    setAuthResponse(response);
    let isAuthenticated = false;
    if (response.status === 200) {
      const token = response.token;
      if (token !== "") {
        isAuthenticated = true;
        window.localStorage.setItem("token", token);
        getProfile();
      }
    }
    dispatch({
      type: "login",
      isAuthenticated: isAuthenticated,
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
    <Fragment>
    {isShowAlert &&
      <Alert 
        title={title} 
        afterClose={()=>setIsShowAlert(false)}
        showIcon={showIcon}
        description={description}
        animation={animation}
      />
    }
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
        isSubmitLoading,
        history: props.history,
        match: props.match,
        showAlert: props => {
          setTitle(props.title);
          setShowIcon(props.showIcon)
          setAnimation(props.animation)
          setDescription(props.description)
          setIsShowAlert(!isShowAlert);
          setTimeout(function () {
            setIsShowAlert(false)
          },4000)
        },
        // translate,
        // Trans,
        authResponse
      }}
    >
      {props.children}
    </CreateRootContext.Provider>
    </Fragment>
  );
};
export const useRootContext = () => useContext(CreateRootContext);
export default RootContext;
