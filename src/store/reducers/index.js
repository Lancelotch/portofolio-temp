import { combineReducers } from 'redux';
import authentication from './authentication';
import product from './product';

const reducers = combineReducers({
    authentication: authentication,
    product: product
});

export default reducers;