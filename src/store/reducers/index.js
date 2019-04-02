import { combineReducers } from 'redux';
import authentication from './authentication';
import product from './product';
import address from './address';

const reducers = combineReducers({
    authentication: authentication,
    product: product,
    address: address
});

export default reducers;