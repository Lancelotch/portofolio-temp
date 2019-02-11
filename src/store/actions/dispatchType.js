import { ACTIVATION, LOGIN_SOCIAL_MEDIA, LOGIN } from "./types";

const activationUser = authData => {
    return{
        type : ACTIVATION,
        payload : authData
    }
}

const login = authData => {
    return{
        type : LOGIN,
        payload : authData
    }
}

const loginSocialMedia = authData => {
    return{
        type : LOGIN_SOCIAL_MEDIA,
        payload : authData
    }
}

const dispatchType = {
    activationUser : activationUser,
    loginSocialMedia : loginSocialMedia,
    login : login
}

export default dispatchType;