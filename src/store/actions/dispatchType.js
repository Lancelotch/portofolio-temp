import TYPE from "./type";

const activationUser = authData => {
  return {
    type: TYPE.ACTIVATION,
    payload: authData
  };
};

const activationError = () => {
  return {
    type : TYPE.ACTIVATION_ERROR
  }
}

const registerWithForm = authData => {
  return {
    type: TYPE.REGISTER_WITH_FORM,
    payload: authData
  };
};

const registerFailed = data => {
  return {
    type : TYPE.REGISTER_FAILED ,
    payload: data
  }
}


const loginWithForm = authData => {
  return {
    type: TYPE.LOGIN_WITH_FORM,
    payload: authData
  };
};

const loginFailed = errorData => {
  return {
    type : TYPE.LOGIN_FAILED,
    payload: errorData
  }
}

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

export const authFail = response => {
  return {
    type: TYPE.AUTH_FAIL,
    payload: response
  };
};

export const openModal = response => {
  return {
    type: TYPE.OPEN_MODAL,
    payload: response
  }
}

export const closeModal = response => {
  return {
    type: TYPE.CLOSE_MODAL,
    payload: response
  }
}

export const getCustomerName = response => {
  return {
    type: TYPE.GET_CUSTOMER_NAME,
    payload:response
  }
}

export const clearError = response => {
  return {
    type: TYPE.CLEAR_ERROR
  }
}

const dispatchType = {
  authFail: authFail,
  handleLoading: handleLoading,
  activationUser: activationUser,
  loginWithGoogle: loginWithGoogle,
  loginWithFormEror: loginWithFormEror,
  loginWithForm: loginWithForm,
  registerWithForm: registerWithForm,
  logout: logout,
  products: products,
  getAddressDefault: getAddressDefault,
  loginFailed: loginFailed,
  registerFailed: registerFailed,
  openModal: openModal,
  closeModal: closeModal,
  getCustomerName: getCustomerName,
  clearError: clearError,
  activationError: activationError
};

export default dispatchType;