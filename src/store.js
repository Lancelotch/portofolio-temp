import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import dynamicMiddlewares, { addMiddleware, resetMiddlewares } from 'redux-dynamic-middlewares';
import { composeWithDevTools } from 'redux-devtools-extension';

export default (() => {
  const store = createStore(createReducer(), composeWithDevTools(
    applyMiddleware(thunk, dynamicMiddlewares)
  ));
  store.async = {};
  store.middleware = {};
  return store;
})();

export function registerReducer(store, name, reducer, middleware) {
  store.async[name] = reducer;
  store.replaceReducer(createReducer(store.async));

  resetMiddlewares();
  if (middleware) {
    store.middleware[name] = middleware;
  }
  const arrayMiddleware = newMiddleware(store.middleware);
  arrayMiddleware.forEach(item => {
    addMiddleware(...item);
  });
}

function newMiddleware(middleware) {
  let newMiddleware = [];
  Object.keys(middleware).forEach(key => {
    newMiddleware.push(mapMiddleware(middleware[key]));
  });
  return newMiddleware;
}

function mapMiddleware(middleware) {
  const arrayMiddleware = [];
  Object.keys(middleware).forEach(key => {
    arrayMiddleware.push(middleware[key]);
  });
  return arrayMiddleware;
}

function createReducer(reducers) {
  return combineReducers({
    root: (state = null) => state,
    ...reducers
  });
}