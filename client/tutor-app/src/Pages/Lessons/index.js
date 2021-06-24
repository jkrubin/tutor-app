import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as lessonsActions from '../../redux/lessons/actions'
import {get} from '../../req' 
import {
    Table,
    Spinner
}from 'evergreen-ui'
//import List from './List'
import LessonList from './LessonList'
import './style.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom"
import LessonFull from './LessonFull'
import { useRouteMatch } from 'react-router'
const Lessons = (props) =>{
    const d = useDispatch()
    const match = useRouteMatch()
    const lessons = useSelector(state => state.lessons)
    const auth = useSelector(state => state.auth)
    let data = lessons.data
    let isLessonsLoading = lessons.isLoading
    const callAPI = async()=>{
        d(lessonsActions.setLoading(true))
        let data = await get('/api/lesson')
        d(lessonsActions.getLessons(data.data))
        let purchased = await get('/api/purchase/lessons')
        d(lessonsActions.getPurchased(purchased.data))
        d(lessonsActions.setLoading(false))
    }
    useEffect(()=>{
        console.log('lesson effect')
        callAPI()
    },[])
    return(
        <div>
            <Switch>
                <Route path ={`${match.path}/:id/view`}>
                    <LessonFull/>
                </Route>
                <Route path ={`${match.path}/`}>
                    <div className='lesson-container'>
                        <h1 style={{marginTop:0}}>Lessons:</h1>
                        {isLessonsLoading?
                            <Spinner />
                            :
                            <LessonList lessons = {lessons}/>
                        }
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default Lessons