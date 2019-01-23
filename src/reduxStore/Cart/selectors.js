import { createSelector } from 'reselect';
import _isUndefined from 'lodash/isUndefined';
import _isNull from 'lodash/isNull';

const selectCart = () => (state) => state['Cart'];

const cartSelector = (item) => createSelector(
  selectCart(),
  (substate) => _isUndefined(item) || _isNull(item) || item === '' ? substate.toJS() : substate.get(item)
);

export { cartSelector };
