import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as LessonActions from '../../redux/lessons/actions'
import {
    Pane,
    Select,
    Icon,
    AddIcon,
    MinusIcon,
    ShoppingCartIcon,
    toaster
}from 'evergreen-ui'
import * as cartActions from '../../redux/cart/actions'
import LessonDisplay from './LessonDisplay'
const LessonList = (props) =>{
    let {lessons} = props
    let auth = useSelector(state => state.auth)
    const d = useDispatch()
    const cart = useSelector(state => state.cart)
    let isAdmin = auth.user && auth.user.admin === true
    let semesterOP = [{id: 1, display: 'All', value: true}, {id: 2, display: 'Fall', value: 2}, {id:3, display: 'Spring', value: 3}]
    //TODO implement backend semester category
    const [selectedSemester, setSelectedSemester] = useState(false)
    const [lessonEdit, setLessonEdit] = useState(false)
    const [hovered, setHovered] = useState(false)
    const createLesson = () =>{
        d(LessonActions.addLesson({id: 0, name:'', description:''}))
        setLessonEdit(0)
    }
    // const [windowSize, setWindowSize] = useState({height: window.innerHeight, width: window.innerWidth})
    // useEffect(()=>{
    //     const handleResize = () =>{
    //         setWindowSize({height: window.innerHeight, width: window.innerWidth})
    //     }

    //     window.addEventListener('resize', handleResize)
    //     return() =>{
    //         window.removeEventListener('resize', handleResize)
    //     }
    // })

    const lessonsList = lessons.data.map((lesson, i) =>{
        return(
            <LessonDisplay key={lesson.id} lesson={lesson} isAdmin={isAdmin} isHovered={hovered === lesson.id} hoverCB={setHovered}/>
        )
    })

    return(
        <div className='lesson-content'>
            <div className = 'lesson-list'>
                {lessonsList}{lessonsList}
            </div>
        </div>
    )
}

export default LessonList