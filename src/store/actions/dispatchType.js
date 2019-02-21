import TYPE from "./type";

const activationUser = authData => {
    return{
        type : TYPE.ACTIVATION,
        payload : authData
    }
}

const loginWithForm = authData => {
    return{
        type : TYPE.LOGIN_WITH_FORM,
        payload : authData
    }
}

const logout = () => {
    return{
        type : TYPE.LOGOUT
    }
}

const loginWithGoogle = authData => {
    return{
        type : TYPE.LOGIN_WITH_GOOGLE,
        payload : authData
    }
}

const products = productList => {
    return{
        type : TYPE.PRODUCT_LIST,
        payload : productList
    }
}

const dispatchType = {
    activationUser : activationUser,
    loginWithGoogle : loginWithGoogle,
    loginWithForm : loginWithForm,
    logout: logout,
    products: products
}

export default dispatchType;