import { UPDATE_CART_CONTENT_QTY } from "../actions/types";

// import { combineReducers } from 'redux';


const initialState = {
    cartContentQty: 0,
}

const cart = (state = initialState, action) => {
    if (action.type === UPDATE_CART_CONTENT_QTY) {
        return Object.assign({}, state, {
            cartContentQty: action.payload,
        })
    }

    return state;
}

// const todoApp = combineReducers({
//     cart,
// });

export default cart;
