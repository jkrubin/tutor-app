import ActionTypes from './types'

export const login = (user)=>{
    return {type: ActionTypes.SET_AUTH, payload: user}
}
export const setIsLoading = (isLoading)=>{
    return {type: ActionTypes.SET_LOADING, payload: isLoading}
}