import TYPE from "./type";

const activationUser = authData => {
  return {
    type: TYPE.ACTIVATION,
    payload: authData
  };
};

const registerWithForm = authData => {
  return {
    type: TYPE.REGISTER_WITH_FORM,
    payload: authData
  };
};

const customerDetail = name => {
    return{
        type: TYPE.NAME_HEADER,
        payload: name
    }
}

const loginWithForm = authData => {
  return {
    type: TYPE.LOGIN_WITH_FORM,
    payload: authData
  };
};

const loginWithFormEror = response => {
  return {
    type: TYPE.LOGIN_WITH_FORM_EROR,
    payload: response
  };
};

const logout = () => {
  return {
    type: TYPE.LOGOUT
  };
};

const loginWithGoogle = authData => {
  return {
    type: TYPE.LOGIN_WITH_GOOGLE,
    payload: authData
  };
};

const products = productList => {
  return {
    type: TYPE.PRODUCT_LIST,
    payload: productList
  };
};

const handleLoading = () => {
  return {
    type: TYPE.HANDLE_LOADING
  };
};

const getAddressDefault = response => {
  return {
    type: TYPE.GET_ADDRESS_DEFAULT,
    payload: response
  };
};

const dispatchType = {
    customerDetail: customerDetail,
  handleLoading: handleLoading,
  activationUser: activationUser,
  loginWithGoogle: loginWithGoogle,
  loginWithFormEror: loginWithFormEror,
  loginWithForm: loginWithForm,
  registerWithForm: registerWithForm,
  logout: logout,
  products: products,
  getAddressDefault: getAddressDefault
};

export default dispatchType;
