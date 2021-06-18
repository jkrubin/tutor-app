import ActionTypes from './types'

export const addCart = (lessonId) =>{
    return {type: ActionTypes.ADD_CART, payload: lessonId}
}
export const removeCart = (lessonId) =>{
    return {type: ActionTypes.REMOVE_CART, payload: lessonId}
}
export const clearCart = (lessonId) =>{
    return {type: ActionTypes.CLEAR_CART, payload: lessonId}
}