import { ACTIVATION } from "./types";

const activationUser = authData => {
    return{
        type : ACTIVATION,
        payload : authData
    }
}

const dispatchType = {
    activationUser : activationUser
}

export default dispatchType;