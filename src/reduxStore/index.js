import authReducers from './Auth/reducers';
import authMiddlewares from './Auth/middlewares';

import cartReducers from './Cart/reducers';
import cartMiddlewares from './Cart/middlewares';

const reduxStore = [{
  name: 'Auth',
  reducer: authReducers,
  middleware: authMiddlewares
},{
  name: 'Cart',
  reducer: cartReducers,
  middleware: cartMiddlewares
}]

export default reduxStore;