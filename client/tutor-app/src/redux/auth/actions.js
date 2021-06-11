import ActionTypes from './types'
export const setAuth = (user) =>{
    return {type: ActionTypes.SET_AUTH, payload: user}
}
export const login = (user)=>{
    return {type: 'USER_LOGIN', payload: user}
}
export const setIsLoading = (isLoading)=>{
    return {type: 'USER_ISLOADING', payload: isLoading}
}