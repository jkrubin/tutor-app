import React, {useState} from 'react'
import { saveAs } from 'file-saver'
import {Document,Page} from 'react-pdf'
import * as base64 from 'base64topdf'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload, faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'evergreen-ui'
import './style.css'
const Attachment = ({name, description, data, metaData, isLoading})=>{
    let type, downloadLink = null
    try{
        type = metaData.type
        downloadLink= type == 'link'? null :
        (
            <a href={`data:${metaData.mimetype};base64,${data}`} download={`${name}.${metaData.ext}`}>
                <div className='FA-icon attachment-icon attachment-download-icon'><FontAwesomeIcon icon={faFileDownload} /></div>
            </a>
        )
    }catch(err){
        
    }
    const handleOpen = () =>{
        if(type==='link'){
            window.open(metaData.link, '_blank')
        }
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
                {isLoading?
                    <Spinner size={64} />
                    :
                   <>
                        <div className='attachment-title'>
                            <h3>{name}</h3>
                            <h4>{description}</h4>
                        </div>
                        <div className='attachment-toolbar'>
                            {type == 'link'?
                                <a target='_blank' href={metaData.link}>
                                    <div className='FA-icon attachment-icon attachment-open-icon'><FontAwesomeIcon icon={faExternalLinkAlt} /></div>
                                </a>
                            :
                                <>
                                <div className='FA-icon attachment-icon attachment-open-icon' onClick={()=>{handleOpen()}}><FontAwesomeIcon icon={faExternalLinkAlt} /></div>
                                {downloadLink}
                                </>
                            }
                        </div>
                   </> 
                }
            </div>
        </div>
        </>
    )
}
export default Attachment