import {createStore, combineReducers} from 'redux'

import user from './user'
import data from './data'
import lessons from './lessons'
const reducers = combineReducers({ user, lessons })

export default createStore(reducers, undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())