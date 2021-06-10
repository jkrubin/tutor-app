import ActionTypes from './types'
export const setUser = (user) =>{
    return {type: ActionTypes.SET_USER, payload: user}
}