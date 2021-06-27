import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import * as req from '../../req'
import Attachment from './Attachment'
import './lessonFull.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddAttachmentForm from './Attachment/AddAttachmentForm'
import { toaster, Button, Spinner} from 'evergreen-ui'
import * as LessonActions from '../../redux/lessons/actions'
const LessonFull = ({edit}) =>{
    const params = useParams()
    const history = useHistory()
    const d = useDispatch()
    const auth = useSelector((state)=>state.auth)
    let isNew = false
    let {id} = params
    if(id === 'new'){
        isNew = true
    }else{
        id = parseInt(id)
    }
    const [lesson, setLesson] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(edit)
    const [editLesson, setEditLesson] = useState({})
    const [isAddAttachment, setIsAddAttachment] = useState()
    useEffect(()=>{
        const callAPI = async ()=>{
            setIsLoading(true)
            let res = await req.get(`/api/lesson/${id}${auth.user.admin? '/admin': ''}`)
            let resLesson = res.data
            setLesson(resLesson)
            setEditLesson(resLesson)
            setIsLoading(false)
            setIsEdit(false)
        }
        if(id === 'new'){
            setLesson({
                name: '',
                description: '',
                Attachments: [],
            })
            setIsEdit(true)
        }else{
            callAPI()
        }
    },[id])
    const handleAttachmentUpdate = (attachment) =>{
        let attachments = lesson.Attachments.length? lesson.Attachments.slice() : []
        attachments.filter(a => a.id !== attachment.id)
        attachments.push(attachment)
        setLesson({...lesson, Attachments:attachments})
    }
    const updateLesson = async () =>{
        const {name, description} = editLesson
        setIsLoading(true)
        let res = await req.put(`/api/lesson/${id}`, {name, description})
        if(res.status === 200){
            let newLesson = res.data
            const {name, description} = newLesson
            setLesson({...lesson, name, description})
            setEditLesson(newLesson)
            setIsEdit(false)
        }else{

        }
        setIsLoading(false)

    }
    const createLesson = async () =>{
        const {name, description} = editLesson
        setIsLoading(true)
        let res = await req.post('/api/lesson', {name, description})
        if(res.status === 200){
            let newLesson = res.data
            d(LessonActions.addLesson(newLesson))
            setIsLoading(false)
            history.push(`/lessons/${newLesson.id}/view`)
        }
    }
    const handleLessonChange = (e) =>{
        const {name, value} = e.target
        setEditLesson({...editLesson, [name]: value})
    }
    const handleDiscard = () =>{
        setEditLesson(lesson)
        setIsEdit(false)
    }
    const discardNew = () =>{
        history.push('/lessons')
    }
    const attachmentDisplay = lesson.Attachments? 
        lesson.Attachments.map((attachment) =>{
            return <Attachment isLoading={isLoading} {...attachment} key={attachment.id}/>
        })
    :
        false
    return(
        <div className='content-lesson-full content-page'>
            <h1 className='content-header'>Lesson</h1>
            <div className='lesson-full-wrapper'>
                <div className='lesson-full-body content-body'>
                    {isLoading?
                        <Spinner size={64}/>
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
                                            <Button className='submit-button' isLoading={isLoading} onClick={()=>{isNew? createLesson(): updateLesson()}}>Save</Button>
                                            <Button className='discard-button' isLoading={isLoading} onClick={()=>{isNew? discardNew(): handleDiscard()}}>Discard Changes</Button>
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
                            <div className={`lesson-attachments ${isNew && 'new-lesson-attachments'}`}>
                                {auth.user.admin && !isNew &&
                                    <div className='add-attachment add-button'>
                                        <div className='FA-icon add-attachment-icon add-icon' onClick={()=>{setIsAddAttachment(true)}}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                    </div>
                                }
                                {isNew? 
                                    <h3 className='new-lesson-attachment'>Must create lesson before adding attachments</h3>
                                :isAddAttachment?
                                    <AddAttachmentForm 
                                        onCreate={handleAttachmentUpdate}
                                        lessonId={id} 
                                        close={()=>{setIsAddAttachment(false)}}/>
                                :
                                    attachmentDisplay
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default LessonFull