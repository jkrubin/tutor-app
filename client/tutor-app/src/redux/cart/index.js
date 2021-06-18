import ActionTypes from './types'
const initialState = {
    lessons:[]
}
let cart = (state = initialState, action) =>{
    switch(action.type){
        case ActionTypes.ADD_CART:
            let lessons = state.lessons.slice()
            if(!lessons.includes(action.payload)){
                lessons.push(action.payload)
            }
            return {lessons: lessons}
        case ActionTypes.REMOVE_CART:
            let removedLessons = state.lessons.filter(lesson => lesson !== action.payload)            
            return{lessons:removedLessons}
        case ActionTypes.CLEAR_CART:
            return initialState
        default:
            return state
    }
} 
export default cart 