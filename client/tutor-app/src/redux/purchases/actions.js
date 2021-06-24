import ActionTypes from './types'

export const addPurchase = (purchase) =>{
    return {type: ActionTypes.ADD_PURCHASE, payload: purchase}
}
export const removePurchase = (id) =>{
    return {type: ActionTypes.REMOVE_PURCHASE, payload: id}
}
export const clearPurchases = () =>{
    return {type: ActionTypes.CLEAR_PURCHASES, payload:{}}
}

export const getPurchases = (purchases) =>{
    return {type: ActionTypes.GET_PURCHASES, payload: purchases}
}

export const updatePurchase = (purchase) =>{
    return {type: ActionTypes.UPDATE_PURCHASE, payload: purchase}
}

export const setIsLoading = (isLoading) =>{
    return {type: ActionTypes.SET_ISLOADING, payload: isLoading}
}