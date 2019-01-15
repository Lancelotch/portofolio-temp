import { UPDATE_CART_CONTENT_QTY } from "../actions/types";

const initialState = {
    contentQty: 0,
}

const cart = (state = initialState, action) => {
    if (action.type === UPDATE_CART_CONTENT_QTY) {
        return Object.assign({}, state, {
            contentQty: action.payload,
        })
    }

    return state;
}

export default cart;
