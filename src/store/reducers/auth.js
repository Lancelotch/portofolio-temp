const initialState = {
    token: [],
    isLoading: false,
    isFinish: false,
    isError: false,
    isAuthenticated : false
}


export default (state = initialState, action) => {
    switch (action.type) {
        // case login
        case "LOGIN":
            return {
                ...state, token : action.payload,
                isAuthenticated : true
            }
        // case "LOGIN_PENDING":
        //     return {
        //         ...state, isLoading: true
        //     }

        // case "LOGIN_FULFILLED":
        //     return {
        //         ...state,
        //         isLoading: false, isFinish: true,
        //         token: action.payload,
        //         isAuthenticated : true
        //     }

        // case "LOGIN_REJECTED":
        //     return {
        //         ...state, isError: true, isLoading: false

        //     }

        // case logout
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
       
        default:
            return state
    }
}