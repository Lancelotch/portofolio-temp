import { combineReducers } from "redux"
import authReducer from "./authentication"
import cart from "./cart"

const rootReducer = combineReducers({
    authReducer,
    cart,
})

export default rootReducer;
