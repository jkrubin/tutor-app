const initialState = {
    data: [],
    isLoading: true
}
let lessons = (state = initialState, action) =>{
    switch(action.type){
        case 'GET_LESSONS':
            return {...state, data: action.payload}
        case 'UPDATE_LOADING':
            return {...state, isLoading: action.payload}
        default:
            return state
    }
} 
export default lessons 