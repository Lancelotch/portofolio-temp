import { createSelector } from 'reselect';
import _isUndefined from 'lodash/isUndefined';
import _isNull from 'lodash/isNull';

const selectAuth = () => (state) => state['Auth'];

const authSelector = (item) => createSelector(
  selectAuth(),
  (substate) => _isUndefined(item) || _isNull(item) || item === '' ? substate.toJS() : substate.get(item)
);

export { authSelector };
