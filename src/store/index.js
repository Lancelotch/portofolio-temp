import {createStore} from 'redux';
import rootReducer from './reducers';
import authReducer from './reducers/authentication';


const store = createStore(rootReducer);

export default store;