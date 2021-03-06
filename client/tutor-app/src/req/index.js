import axios from 'axios'
import store from '../redux'
import { toaster } from 'evergreen-ui'
const url = 'http://localhost:8081'
export async function get(path, params = {}){
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
    let data = {}
    try{
        data = await axios.get(url+path, finalParams)
        return data
    }catch(err){
        toaster.danger(err.response.data.error)
        return err
    }

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
    let data
    try{
        data = await axios.post(url+path, body, finalParams)
        return data
    }catch(err){
        toaster.danger(err.response.data.error)
        return err.response
    }
}
export async function put(path, body, params = {}){
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
    let data
    try{
        data = await axios.put(url+path, body, finalParams)
        return data
    }catch(err){
        toaster.danger(err.response.data.error)
        return err.response
    }
}