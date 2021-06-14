import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as LessonActions from '../../redux/lessons/actions'
import {
    Table,
    Select,
    Icon,
    AddIcon,
    ShoppingCartIcon
}from 'evergreen-ui'
import LessonItem from './LessonItem'
const List = (props) =>{
    let lessons = useSelector(state => state.lessons)
    let auth = useSelector(state => state.auth)
    const d = useDispatch()
    let isAdmin = auth.user && auth.user.admin === true
    let semesterOP = [{id: 1, display: 'All', value: true}, {id: 2, display: 'Fall', value: 2}, {id:3, display: 'Spring', value: 3}]
    //TODO implement backend semester category
    const [selectedSemester, setSelectedSemester] = useState(false)
    const [lessonEdit, setLessonEdit] = useState(false)
    const createLesson = () =>{
        d(LessonActions.addLesson({id: 0, name:'', description:''}))
        setLessonEdit(0)
    }
    const lessonRows = lessons.data.map((lesson) =>{
        return(
            <LessonItem lesson={lesson} isEdit={lessonEdit === lesson.id} editCB={setLessonEdit} key={lesson.id} isAdmin={isAdmin}/>
        )
    })
    return(
        <Table>
            <Table.Head paddingRight='0'>
                <Table.TextHeaderCell flex='0 1 200px'>Lesson</Table.TextHeaderCell>
                <Table.TextHeaderCell flex='1 1'>summary</Table.TextHeaderCell>
                <Table.TextHeaderCell flex='0 1 100px'>Semester
                    <SemesterSelect 
                        options = {semesterOP} 
                        selected = {selectedSemester}
                        setSelected= {setSelectedSemester}
                    />
                </Table.TextHeaderCell>
                <Table.TextHeaderCell flex='0 1 65px'>price</Table.TextHeaderCell>
                {isAdmin ?
                    <Table.TextHeaderCell flex='0 1 50px'>
                        <Icon onClick={createLesson} icon={AddIcon} size={20}/>
                    </Table.TextHeaderCell>
                    :
                    <Table.TextHeaderCell flex='0 1 50px'>
                        <Icon icon={ShoppingCartIcon} size={20}/>
                    </Table.TextHeaderCell>
                }
            </Table.Head>
            <Table.Body>
                {lessonRows}
            </Table.Body>
        </Table>
    )
}

const SemesterSelect = (props) =>{
    let {options, selected, setSelected} = props
    let optDisplay = options.map((option, i) =>{
        return (
            <option 
                value={i} 
                selected = {selected === i}
                key={i}
            >
                {option.display}
            </option>
        )
    })
    return (
        <Select 
            value={selected}   
            onChange={e => setSelected(e.target.value)}
            paddingLeft = {5}
            >
            {optDisplay}
        </Select>
    )
}
export default List