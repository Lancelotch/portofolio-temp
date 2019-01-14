import { combineReducers } from "redux"
import authReducer from "./authentication"
import cart from "./cart"

const rootReducer = combineReducers({
    authReducer : authReducer,
    cart : cart
})

export default rootReducer;