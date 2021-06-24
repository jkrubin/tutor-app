import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import * as req from '../../req'
import Attachment from './Attachment'
import './lessonFull.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddAttachmentForm from './Attachment/AddAttachmentForm'
import { toaster } from 'evergreen-ui'
const LessonFull = ({}) =>{
    const params = useParams()
    const auth = useSelector((state)=>state.auth)
    let {id} = params
    id = parseInt(id)
    const [lesson, setLesson] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editLesson, setEditLesson] = useState({})
    const [isAddAttachment, setIsAddAttachment] = useState()
    useEffect(()=>{
        const callAPI = async ()=>{
            setIsLoading(true)
            let res = await req.get(`/api/lesson/${id}`)
            let resLesson = res.data
            setLesson(resLesson)
            setEditLesson(resLesson)
            setIsLoading(false)
        }
        callAPI()
    },[id])
    const updateLesson = async () =>{
        const {name, description} = editLesson
        setIsLoading(true)
        let res = await req.put(`/api/lesson/${id}`, {name, description})
        if(res.status === 200){
            let newLesson = res.data
            setLesson(newLesson)
            setEditLesson(newLesson)
            setIsEdit(false)
        }else{

        }
        setIsLoading(false)

    }
    const handleLessonChange = (e) =>{
        const {name, value} = e.target
        setEditLesson({...editLesson, [name]: value})
    }
    const lessons = useSelector(state => state.lessons)
    const attachmentDisplay = lesson.Attachments? 
        lesson.Attachments.map((attachment) =>{
            return <Attachment {...attachment} key={attachment.id}/>
        })
    :
        false
    return(
        <div className='content-lesson-full content-page'>
            <h1 className='content-header'>Lesson</h1>
            <div className='lesson-full-wrapper'>
                <div className='lesson-full-body content-body'>
                    {isLoading?
                        <h1>loading...</h1>
                            :
                        <div className='lesson-full-content'>
                            <div className='lesson-title-wrapper'>
                                <div className='lesson-title-box'>
                                    {isEdit? 
                                        <>
                                            <input 
                                                name='name'
                                                value={editLesson.name}
                                                onChange={handleLessonChange}
                                                className='lesson-input name-input'
                                            />
                                            <textarea 
                                                name='description'
                                                value={editLesson.description}
                                                onChange={handleLessonChange}
                                                className='lesson-input description-input'
                                            />
                                        </>
                                    :
                                        <>
                                            <h1>{lesson.name}</h1>
                                            <h3>{lesson.description}</h3>
                                        </>
                                    }
                                </div>
                                {auth.user.admin &&
                                    <div className='lesson-admin-toolbar'>
                                        {isEdit &&
                                            <>
                                            <button isLoading={isLoading} onClick={()=>{updateLesson()}}>Save</button>
                                            <button isLoading={isLoading} onClick={()=>{setEditLesson(lesson); setIsEdit(false)}}>Discard</button>
                                            </>
                                        }
                                        <div onClick={()=>{setIsEdit(!isEdit)}} className='lesson-admin-icon FA-icon'>
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </div>
                                        <div className='lesson-admin-icon FA-icon'>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </div>
                                    </div>
                                }
                            </div>
                            <h2>Attachments:</h2> 
                            <div className='lesson-attachments'>
                                {auth.user.admin && 
                                    <div className='add-attachment'>
                                        <div className='FA-icon add-attachment-icon' onClick={()=>{setIsAddAttachment(true)}}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                    </div>
                                }
                                {isAddAttachment?
                                    <AddAttachmentForm lessonId={id} />
                                :
                                    attachmentDisplay}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default LessonFull