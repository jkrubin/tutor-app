import React, { useState } from 'react'
import { useSelector } from 'react-redux'
const AddAttachmentForm = ({lessonId})=>{

    const auth = useSelector(state => state.auth)
    const [formData, setFormData] = useState({})
    return(
        <div className='add-attachment-form'>

        </div>
    )
}

export default AddAttachmentForm