import {createStore, applyMiddleware, combineReducers} from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import {
    ChatReducer,
    UsersReducer,
} from './reducers'

const rootReducer = combineReducers({
    UsersReducer,
    ChatReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export {store, rootReducer}