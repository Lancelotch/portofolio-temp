import { fromJS } from 'immutable';
import * as consts from './constants';

const initialState = fromJS({});

export default (state = initialState, action) => {
  switch (action.type) {
    case consts.LOGIN:
      return state
        .set('isAuthenticated', true)
        .set('token', action.payload);
    case consts.LOGOUT:
      return state
        .set('isAuthenticated', false)
        .set('token', null);
    default:
      return state;
  }
};
