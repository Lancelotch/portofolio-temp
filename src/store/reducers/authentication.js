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
    customerName: ''
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
                customerName: ''
            }
        case TYPE.REGISTER_WITH_FORM:
            return {
                ...state,
                message: action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case TYPE.REGISTER_FAILED :
            return {
                ...state,
                message: action.payload,
                isAuthenticated: false,
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