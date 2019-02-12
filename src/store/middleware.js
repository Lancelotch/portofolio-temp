import { applyMiddleware, compose } from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// middlewares logger
// const logger = createLogger();
// middlewares.push(logger);
// middlewares.push(thunk);
// middlewares.push(promise())

export default composeEnhancers(applyMiddleware(...middleware));