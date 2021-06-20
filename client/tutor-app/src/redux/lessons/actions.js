import ActionTypes from './types'

export const getLessons = (lessons) =>{
    return {type: ActionTypes.GET_LESSONS, payload: lessons}
}
export const addLesson = (lesson) =>{
    return {type: ActionTypes.CREATE_LESSON, payload:lesson}
}
export const updateLesson = (lesson) =>{
    return {type: ActionTypes.UPDATE_LESSON, payload: lesson}
}
export const deleteLesson = (id) =>{
    return {type: ActionTypes.DELETE_LESSON, payload: id}
}
export const getPurchased = (lessonsArr) =>{
    return {type: ActionTypes.GET_PURCHASED, payload: lessonsArr}
}
export const setLoading = (isLoading) =>{
    return {type: ActionTypes.UPDATE_LOADING, payload: isLoading}
}