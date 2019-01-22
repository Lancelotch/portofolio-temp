import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form'

// import all reducer
// import RootNavigator from '../../navigators/RootNavigator';
import authReducer from './auth';
import cartReducer from "./cart";

// const reducerRouter = createNavigationReducer(RootNavigator);

const reducers = combineReducers({
    
    auth: authReducer,
    cart: cartReducer
    
});

export default reducers;