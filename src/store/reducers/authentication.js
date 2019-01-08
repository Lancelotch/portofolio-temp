import * as actionTypes from "../actions/types.js";

const initialState = {
  isAuthenticated: false,
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payLoad
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null
      };
    default :
      return state;
  }
};

export default authReducer;