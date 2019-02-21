import TYPE from "./type";

const activationUser = authData => {
    return{
        type : TYPE.ACTIVATION,
        payload : authData
    }
}

const login = authData => {
    return{
        type : TYPE.LOGIN,
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
    login : login,
    logout: logout,
    products: products
}

export default dispatchType;