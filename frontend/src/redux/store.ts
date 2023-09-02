import {createStore, applyMiddleware, combineReducers} from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import {
    UsersReducer,
} from './reducers'

const rootReducer = combineReducers({
    UsersReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export {store, rootReducer}