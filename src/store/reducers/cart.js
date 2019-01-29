const initialState = {
  contentQty: 0,
  isLoading: false,
  isFinish: false,
  isError: false,
  error: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART":
      return {
        ...state, isLoading: false, isFinish: true,
        contentQty : (initialState.contentQty)
      }
    case "ADD_CART_PENDING":
      return {
        ...state, isLoading: true
      }

    case "ADD_CART_FULFILLED":
      return {
        ...state, isLoading: false, isFinish: true,
        contentQty : (initialState.contentQty),
      }

    case "ADD_CART_REJECTED":
      return {
        ...state, isError: true,
        error: action.payload.data

      }

    case "UPDATE_QTY":
      return {
        ...state, isLoading: false, isFinish: true,
        contentQty: action.payload,
      }

    case "UPDATE_QTY_PENDING":
      return {
        ...state, isLoading: true,
      }

    case "UPDATE_QTY_FULFILLED":
      return {
        ...state, isLoading: false, isFinish: true,
        contentQty: action.payload
      }

    case "UPDATE_QTY_REJECTED":
      return {
        ...state, isError: true,
        error: action.payload.data,

      }

    default:
      return state;
  }
};