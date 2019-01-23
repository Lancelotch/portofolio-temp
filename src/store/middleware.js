import { applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

const middlewares = [];

// middlewares logger
const logger = createLogger();
middlewares.push(logger);
middlewares.push(thunk);
middlewares.push(promise())

export default applyMiddleware(...middlewares);