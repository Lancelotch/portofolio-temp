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

const dispatchType = {
    activationUser : activationUser,
    loginWithGoogle : loginWithGoogle,
    login : login,
    logout: logout
}

export default dispatchType;