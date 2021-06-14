import { SatelliteIcon } from 'evergreen-ui'
import ActionTypes from './types'
const initialState = {
    data: [],
    isLoading: true
}
let lessons = (state = initialState, action) =>{
    let newData = []
    switch(action.type){
        case ActionTypes.GET_LESSONS:
            return {...state, data: action.payload}
        case ActionTypes.CREATE_LESSON:
            console.log(state.data)
            state.data.unshift(action.payload)
            return{...state, data: state.data}
        case ActionTypes.UPDATE_LESSON:
            newData = state.data.map((lesson)=>{
                if(action.payload.id === lesson.id){
                    return action.payload
                }
                return lesson
            })
            return{...state, data: newData}
        case ActionTypes.DELETE_LESSON:
            newData = state.data.filter(lesson => lesson.id !== action.payload)
            return {...state, data: newData}
        case ActionTypes.UPDATE_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
} 
export default lessons 