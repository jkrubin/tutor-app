import Cookies from 'universal-cookie';
const cookies = new Cookies();

let initialState = {user:{}, token: false, isAuth:false, isLoading:false}
let storedAuth = cookies.get('auth')
if(storedAuth){
    initialState = {...storedAuth, isAuth:false}
}
let auth = (state = initialState, action) =>{
    switch(action.type){
        case 'USER_LOGIN':
            return {...state, ...action.payload, isAuth:true}
        case 'USER_ISLOADING':
            return {...state, isLoading: action.payload}
        default:
            return state
    }
} 
export default auth 