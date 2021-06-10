import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as lessonsActions from '../../redux/lessons/actions'
import {get} from '../../req' 
const Lessons = (props) =>{
    const d = useDispatch()
    const lessons = useSelector(state => state.lessons)
    let data = lessons.data
    let isLoading = lessons.isLoading
    useEffect(()=>{
        d(lessonsActions.setLoading(true))
        const callAPI = async()=>{
            let data = await get('/api/lesson')
            d(lessonsActions.getLessons(data.data))
            d(lessonsActions.setLoading(false))
        }
        callAPI()
    },[d])
    return(
        <div>
            {isLoading?
                <p>loading...</p>
                :
                <div>
                    <h3>Lessons:</h3>
                </div>
            }
        </div>
    )
}

export default Lessons