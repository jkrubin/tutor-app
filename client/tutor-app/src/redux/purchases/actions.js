import ActionTypes from './types'

export const addPurchase = (id) =>{
    return {type: ActionTypes.ADD_CART, payload: id}
}
export const removePurchase = (id) =>{
    return {type: ActionTypes.REMOVE_CART, payload: id}
}
export const clearPurchases = (id) =>{
    return {type: ActionTypes.CLEAR_CART, payload: id}
}

export const getPurchases = (purchases) =>{
    return {type: ActionTypes.GET_PURCHASES, payload: purchases}
}

export const setIsLoading = (isLoading) =>{
    return {type: ActionTypes.SET_ISLOADING, payload: isLoading}
}