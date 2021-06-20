import { SatelliteIcon } from 'evergreen-ui'
import ActionTypes from './types'
const initialState = {
    data: [],
    purchasedLessons: {},
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
        case ActionTypes.GET_PURCHASED:
            let get_purchased_data = action.payload
            let purchasedObj = {}
            for(let i =0; i < get_purchased_data.length; i++){
                purchasedObj[get_purchased_data[i].id] = {PurchaseId: get_purchased_data[i].Purchases[0].id}
            }
            return {...state, purchasedLessons: purchasedObj}
        case ActionTypes.UPDATE_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
} 
export default lessons 