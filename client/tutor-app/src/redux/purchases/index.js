import ActionTypes from './types'
const initialState = {
    purchases:[],
    isLoading: false,
}
let purchases = (state = initialState, action) =>{
    switch(action.type){
        case ActionTypes.GET_PURCHASES:
            return {...state, purchases: action.payload}
        case ActionTypes.ADD_PURCHASE:
            let purchases = state.purchases.slice()
            purchases.push(action.payload)
            return {...state, purchases: purchases}
        case ActionTypes.REMOVE_PURCHASE:
            let removedPurchases = state.lessons.filter(purchase => purchase.id !== action.payload.id)            
            return{...state, purchases:removedPurchases}
        case ActionTypes.CLEAR_PURCHASES:
            return initialState
        case ActionTypes.UPDATE_PURCHASE:
            let updatedPurchase = action.payload
            let purchasesUpdated = state.purchases.map((purchase) =>{
                if(updatedPurchase.id === purchase.id){
                    return updatedPurchase
                }
                return purchase
            })
            return {...state, purchases: purchasesUpdated}
        case ActionTypes.SET_ISLOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
} 
export default purchases 