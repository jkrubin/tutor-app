import Cookies from 'universal-cookie';
import ActionTypes from './types'
const cookies = new Cookies();
let initialState = {user:{}, token: false, isAuth:false, isLoading:false}
let storedAuth = cookies.get('auth')
if(storedAuth){
    initialState = {...storedAuth, isAuth:false}
}
let auth = (state = initialState, action) =>{
    switch(action.type){
        case ActionTypes.SET_AUTH:
            return {...state, ...action.payload, isAuth:true}
        case ActionTypes.SET_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
} 
export default auth 