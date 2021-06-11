import axios from 'axios'
import store from '../redux'

const url = 'http://localhost:8081'
export async function get(path, params){
    let state = store.getState()
    let data = await axios.get(url+path, params)
    return data
}

export async function post(path, body, params = {}){
    let state = store.getState()
    let token = false
    try{
        token = state.auth.token
    }catch(err){

    }
    let finalParams = {
        headers:{
            'x-access-token': token
        },
        ...params
    }
    let data = await axios.post(url+path, body, finalParams)
    return data
}