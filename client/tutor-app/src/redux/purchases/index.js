import ActionTypes from './types'
const initialState = {
    purchases:[]
}
let purchases = (state = initialState, action) =>{
    switch(action.type){
        case ActionTypes.GET_PURCHASES:
            return {purchases: action.payload}
        case ActionTypes.ADD_PURCHASE:
            let purchases = state.purchases.slice()
            if(!purchases.includes(action.payload.id)){
                purchases.push(action.payload.id)
            }
            return {purchases: purchases}
        case ActionTypes.REMOVE_PURCHASE:
            let removedPurchases = state.lessons.filter(purchase => purchase.id !== action.payload.id)            
            return{purchases:removedPurchases}
        case ActionTypes.CLEAR_PURCHASES:
            return initialState
        default:
            return state
    }
} 
export default purchases 