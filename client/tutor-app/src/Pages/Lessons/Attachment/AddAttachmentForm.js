import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, toaster } from 'evergreen-ui'
import * as req from '../../../req'
import { useHistory, useLocation } from 'react-router'
const AddAttachmentForm = ({lessonId, close, onCreate = ()=>{}})=>{

    const auth = useSelector(state => state.auth)
    const history = useHistory()
    const loc = useLocation()
    const initialFormInput = {
        name: '',
        description: '',
        file:false,
        link: '',
        type: 'link'
    }
    const [formInput, setFormInput] = useState(initialFormInput)
    const uploadTypes = ['image', 'pdf', 'link']
    const handleChnage = (e)=>{
        const {name, value} = e.target
        setFormInput({...formInput, [name]: value})

    }
    const handleFileChange = (e) =>{
        setFormInput({...formInput, file: e.target.files[0]})
    }
    const handleClose = () =>{
        setFormInput(initialFormInput)
        close()
    }
    const handleSubmit = async () =>{
        const {name, description, file, type, link} = formInput
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('type', type)
        if(type == 'link'){
            if(!link){
                toaster.danger('add a link for a link attachment')
                return false
            }
            formData.append('link', link)
        }else{
            if(!file){
                toaster.danger(`add a file for a ${type} attachment`)
                return false
            }
            formData.append('file', file)
        }
        
        let res = await req.post(`/api/lesson/${lessonId}/attachment`, formData)
        if(res.status === 200){
            toaster.success('Attachment created')
            history.push(loc.pathname)
            onCreate(res.data.attachment)
            close()
        }
    }
    const typesOptionsDisplay = uploadTypes.map((type)=>{
        return <option value={type}>{type}</option>
    })
    return(
        <div className='attachment-form'>
            <div className='attachment-form-area'>
                <div className='attachment-form-input-container'>
                    <label>Name</label>
                    <input
                        name='name'
                        value={formInput.name}
                        onChange={handleChnage}
                        className='attachment-form-input'
                        placeholder='name'
                    />
                </div>
                <div className='attachment-form-input-container'>
                    <label>Description</label>
                    <input
                        name='description'
                        value={formInput.description}
                        onChange={handleChnage}
                        className='attachment-form-input'
                        placeholder='description'
                    />
                </div>
                <div className='attachment-form-input-container'>
                    <label>File type</label>
                    <select
                        name='type'
                        value={formInput.type}
                        onChange={handleChnage}
                        calssName='attachment-form-input'
                    >
                        {typesOptionsDisplay}   
                    </select>
                </div>
                {formInput.type == 'link'?
                    <div className='attachment-form-input-container'>
                        <label>URL</label>
                        <input
                            name='link'
                            onChange={handleChnage}
                            className='attachment-form-input'
                            placeholder='URL'
                        />
                    </div>
                    :
                    <div className='attachment-form-input-container'>
                        <label>File</label>
                        <input 
                            name='file'
                            type='file'
                            onChange={handleFileChange}
                        />
                    </div>
                }
                <div className='attachment-form-submit'>
                    <Button onClick={()=>{handleClose()}} className='discard-button'>Cancel</Button>
                    <Button onClick={()=>{handleSubmit()}} className='submit-button'>Create</Button>
                </div>
            </div>
        </div>
    )
}

export default AddAttachmentForm