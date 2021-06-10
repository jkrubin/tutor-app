import ActionTypes from './types'

export const getLessons = (lessons) =>{
    console.log('lessons in action', lessons)
    return {type: 'GET_LESSONS', payload: lessons}
}
export const setLoading = (isLoading) =>{
    return {type: 'UPDATE_LOADING', payload: isLoading}
}