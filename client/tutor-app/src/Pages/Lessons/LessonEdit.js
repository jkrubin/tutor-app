import React, {useState} from 'react'
import {
    TextInput,
    Textarea,
    Button,
}from 'evergreen-ui'
const LessonEdit = (props) =>{
    const {lesson, editCB, isNew = false} = props
    const [formData, setFormData] = useState({
        name: lesson.name,
        description: lesson.description
    })
    const handleChange = (e) =>{
        let {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    const handleSubmit = () =>{
        //ToDo
    }

    const handleDiscard = () =>{
        editCB(false)
    }
    return(
        <div className='lesson-form-outer'>
            <div className='lesson-form-inner'>
                <TextInput
                    name='name'
                    placeholder='lesson name'
                    onChange={handleChange}
                />
                <Textarea
                    name='description'
                    placeholder='description of lesson...'
                />
                <Button onClick={handleSubmit}>Save</Button>
                <Button onClick={handleDiscard}>Cancel</Button>
            </div>
        </div>
    )

}

export default LessonEdit