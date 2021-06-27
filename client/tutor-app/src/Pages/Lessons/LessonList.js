import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
const LessonList = (props) =>{
    let {lessons} = props
    let auth = useSelector(state => state.auth)
    const d = useDispatch()
    const history = useHistory()
    const cart = useSelector(state => state.cart)
    let isAdmin = auth.user && auth.user.admin === true
    let semesterOP = [{id: 1, display: 'All', value: true}, {id: 2, display: 'Fall', value: 2}, {id:3, display: 'Spring', value: 3}]
    //TODO implement backend semester category
    //const [selectedSemester, setSelectedSemester] = useState(false)
    const [hovered, setHovered] = useState(false)
    const createLesson = () =>{
        history.push('/lessons/new/view')
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
                {auth.user.admin &&
                    <div className='add-attachment add-button' onClick={createLesson}>
                        <div className='FA-icon add-attachment-icon add-icon' onClick={()=>{}}>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                }
                {lessonsList}
            </div>
        </div>
    )
}

export default LessonList