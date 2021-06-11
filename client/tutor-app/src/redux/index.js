import {createStore, combineReducers} from 'redux'

import auth from './auth'
import data from './data'
import lessons from './lessons'
const reducers = combineReducers({ auth, lessons })

export default createStore(reducers, undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())