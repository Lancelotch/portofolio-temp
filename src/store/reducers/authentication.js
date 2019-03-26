import TYPE from '../actions/type';

const initialState = {
    token: [],
    isLoading: false,
    isFinish: false,
    isError: false,
    isAuthenticated : false,
}


export default (state = initialState, action) => {
    switch (action.type) {
        case TYPE.LOGIN_WITH_FORM:
            return {
                ...state,
                auth: action.payload,
                isAuthenticated: true
            }
        case TYPE.LOGIN_WITH_GOOGLE:
            return {
                ...state,
                auth: action.payload,
                isAuthenticated: true
            }
        case TYPE.LOGOUT:
            return {
                ...state,
                auth: null,
                isAuthenticated: false
            }
            case TYPE.NAME_HEADER:
            return{
                ...state,
                name: action.payload
            }
        case TYPE.REGISTER_WITH_FORM:
            return {
                ...state,
                message: action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case TYPE.HANDLE_LOADING:
            return {
                ...state,
                isLoading: true
            }
            // case "IS_EXPIRED" : 
            //     return {
            //         ...state,
            //           isAuthenticated : (action.payload.data == 'Unauthorized') ? false :true,
            //           token : (action.payload.data == 'Unauthorized') ? null : state.token
            //     }  
        case TYPE.ACTIVATION:
            return {
                ...state,
                auth: action.payload,
                isAuthenticated: true
            }
        default:
            return state
    }
}