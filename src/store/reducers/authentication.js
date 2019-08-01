import TYPE from '../actions/type';

const initialState = {
    token: [],
    isLoading: false,
    isFinish: false,
    isError: false,
    checkError: false,
    isAuthenticated: false,
    messageError: '',
    statusModal: false,
    customerName: '',
    customerPhoto: '',
    photoUrl: '',
    activated: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        case TYPE.LOGIN_WITH_FORM:
            return {
                ...state,
                auth: action.payload,
                isAuthenticated: true
            }
        case TYPE.LOGIN_FAILED:
            return {
                ...state,
                // isAuthenticated: false,
                messageError: action.payload,
                checkError: true
            }
        case TYPE.GET_CUSTOMER_NAME:
            return {
                ...state,
                customerName: action.payload
            }
        case TYPE.CHANGE_CUSTOMER_NAME:
            return {
                ...state,
                customerName: action.payload
            }
        case TYPE.CHANGE_CUSTOMER_PHOTO:
            return {
                ...state,
                customerPhoto: action.payload
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
                isAuthenticated: false,
                checkError: false,
                messageError: '',
                isLoading: false,
                message: "",
                customerName: '',
                customerPhoto: ''
            }
        case TYPE.REGISTER_WITH_FORM:
            return {
                ...state,
                message: action.payload,
                isAuthenticated: true
            }
        case TYPE.REGISTER_FAILED:
            return {
                ...state,
                messageError: action.payload,
                isAuthenticated: false
            }
        case TYPE.HANDLE_LOADING_ENABLED:
            return {
                ...state,
                isLoading: true
            }
        case TYPE.HANDLE_LOADING_DISABLED:
            return {
                ...state,
                isLoading: false
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
                isAuthenticated: true,
                activated: true
            }
        case TYPE.ACTIVATION_ERROR:
            return {
                ...state,
                activated: false,
                error: action.payload
            }
        case TYPE.OPEN_MODAL:
            return {
                ...state,
                statusModal: true
            }
        case TYPE.CLOSE_MODAL:
            return {
                ...state,
                statusModal: false
            }
        case TYPE.CLEAR_ERROR:
            return {
                ...state,
                messageError: ""
            }
        default:
            return state
    }
}