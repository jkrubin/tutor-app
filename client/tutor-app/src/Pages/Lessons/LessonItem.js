import React from 'react'
import {
    Table,
    Icon,
    EditIcon
} from 'evergreen-ui'
import LessonEdit from './LessonEdit'
import './style.css'
const LessonItem = (props) =>{
    const {lesson, isEdit, editCB, isAdmin} = props

    return(
        <>
        <Table.Row>
            <Table.TextCell>{lesson.name}</Table.TextCell>
                <Table.TextCell>{lesson.description}</Table.TextCell>
                <Table.TextCell flex='0 1 100px'>place</Table.TextCell>
                <Table.TextCell flex='0 1 65px'>$xx</Table.TextCell>
                {isAdmin && 
                    <>
                        <Table.TextCell flex='0 1 65px'>admin func</Table.TextCell> 
                        <Table.TextCell flex='0 1 40px'>
                            <Icon onClick={()=>editCB(lesson.id)} icon={EditIcon} size={20}/>
                        </Table.TextCell>
                    </>
                }
        </Table.Row>
        <Table.Row  height='1000px' maxHeight = {isEdit? '250px': '0'} overflow="hidden" className='expand-box'>
            <LessonEdit {...props} />
        </Table.Row>
        </>
    )
}

export default LessonItem