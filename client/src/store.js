import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import thunkMiddleware from "redux-thunk"
import reducer from "./reducers"

const middleware = applyMiddleware(thunkMiddleware, logger)
export default createStore(reducer, middleware)