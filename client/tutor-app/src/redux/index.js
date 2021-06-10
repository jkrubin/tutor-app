import {createStore, combineReducers} from 'redux'

import user from './user'
import data from './data'
const reducers = combineReducers({ user, data })

export default createStore(reducers)