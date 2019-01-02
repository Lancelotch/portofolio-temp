import * as actionTypes from "../actions/actions.js";

const initialState = {
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true
      };
    default :
      return state;
  }
};

export default authReducer;