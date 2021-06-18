import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as lessonsActions from '../../redux/lessons/actions'
import {get} from '../../req' 
import {
    Table,
    Spinner
}from 'evergreen-ui'
import List from './List'
import LessonList from './LessonList'
import './style.css'
const Lessons = (props) =>{
    const d = useDispatch()
    const lessons = useSelector(state => state.lessons)
    const auth = useSelector(state => state.auth)
    let data = lessons.data
    let isLessonsLoading = lessons.isLoading
    const callAPI = async()=>{
        d(lessonsActions.setLoading(true))
        let data = await get('/api/lesson')
        d(lessonsActions.getLessons(data.data))
        d(lessonsActions.setLoading(false))
    }
    useEffect(()=>{
        callAPI()
    },[d])
    return(
        <div className='lesson-container'>
            <h1 style={{marginTop:0}}>Lessons:</h1>
            {isLessonsLoading?
                <Spinner />
                :
                <LessonList lessons = {lessons}/>
            }
        </div>
    )
}

export default Lessons