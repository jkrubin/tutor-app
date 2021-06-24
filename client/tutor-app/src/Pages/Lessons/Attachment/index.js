import React, {useState} from 'react'
import { saveAs } from 'file-saver'
import {Document,Page} from 'react-pdf'
import * as base64 from 'base64topdf'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload, faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'
import './style.css'
const Attachment = ({name, description, data, metaData})=>{

    let downloadLink=(
        <a href={`data:${metaData.mimetype};base64,${data}`} download={`${name}.${metaData.ext}`}>
            <div className='FA-icon attachment-icon attachment-download-icon'><FontAwesomeIcon icon={faFileDownload} /></div>
        </a>
    )
    const handleOpen = () =>{
        let openLink= document.createElement('object')
        openLink.type = metaData.mimetype
        openLink.data = `data:${metaData.mimetype};base64,${data}`
        openLink.width = '100%'
        openLink.height= '100%'
        try{
            let w = window.open('')
            w.document.write(openLink.outerHTML)
        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
        <div className='attachment-container' onClick={handleOpen}>
            <div className='attachment-content'>
                <div className='attachment-title'>
                    <h3>{name}</h3>
                    <h4>{description}</h4>
                </div>
                <div className='attachment-toolbar'>
                    <div className='FA-icon attachment-icon attachment-open-icon' onClick={()=>{handleOpen()}}><FontAwesomeIcon icon={faExternalLinkAlt} /></div>
                    {downloadLink}
                </div>
            </div>
        </div>
        </>
    )
}
export default Attachment