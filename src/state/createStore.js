import { createStore as reduxCreateStore } from 'redux'

const reducer = (state, action) => {
    if (action.type === `UPDATE_CART_CONTENT_QTY`) {
        return Object.assign({}, state, {
            cartContentQty: action.payload,
        })
    }

    return state
}

const initialState = {
    cartContentQty: 0,
}

const store = reduxCreateStore(reducer, initialState)
export default store
