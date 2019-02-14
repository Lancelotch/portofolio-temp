import TYPE from '../actions/type';

const initialState = {
    token: [],
    isLoading: false,
    isFinish: false,
    isError: false,
    isAuthenticated : false
}


export default (state = initialState, action) => {
    switch (action.type) {
        case TYPE.LOGIN:
            return {
                ...state, 
                auth : action.payload,
                isAuthenticated : true
            }
        case TYPE.LOGIN_WITH_GOOGLE:
            return {
                ...state, 
                auth : action.payload,
                isAuthenticated : true
            }
        case TYPE.LOGOUT:
            return {
                ...state,
                auth: null,
                isAuthenticated : false
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
                auth : action.payload,
                isAuthenticated : true
            }     
        default:
            return state
    }
}