import { ACTIVATION, LOGIN_SOCIAL_MEDIA, LOGIN } from "../actions/types";

const initialState = {
    token: [],
    isLoading: false,
    isFinish: false,
    isError: false,
    isAuthenticated : false
}


export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state, token : action.payload,
                isAuthenticated : true
            }
        case LOGIN_SOCIAL_MEDIA:
            return {
                ...state, token : action.payload,
                isAuthenticated : true
            }
        case "LOGOUT":
            return {
                ...state,
                token: null,
                isAuthenticated : false
            }
        case "IS_EXPIRED" : 
            return {
                ...state,
                  isAuthenticated : (action.payload.data == 'Unauthorized') ? false :true,
                  token : (action.payload.data == 'Unauthorized') ? null : state.token
            }  
        case ACTIVATION:
            return {
                ...state, token : action.payload,
                isAuthenticated : true
            }     
        default:
            return state
    }
}