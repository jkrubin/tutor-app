import axios from 'axios'
const url = 'http://localhost:8081'
export async function get(path, params){
    let data = await axios.get(url+path, params)
    return data
}