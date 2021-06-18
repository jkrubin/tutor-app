import {createStore, combineReducers} from 'redux'

import auth from './auth'
import cart from './cart'
import lessons from './lessons'
import purchases from './purchases'
const reducers = combineReducers({ auth, lessons, cart, purchases })

export default createStore(reducers, undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())