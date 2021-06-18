import React from 'react'
import './style.css'
import {
    Pane
} from 'evergreen-ui'
import { faAtom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Feature = (props) =>{
    const {img, title, body, isFlipped} = props
    console.log(faAtom)
    /*
            <div className='feature-background feature-c3'></div>
            <div className='feature-background feature-c2'></div>
            <div className='feature-background feature-c1'></div>
    */
    return(
        <Pane className={`feature-container`} elevation={1}>
            <div className='feature-background FA-icon'>
                <FontAwesomeIcon icon={faAtom}/>
            </div>
            <Pane className={`feature-header ${isFlipped? 'flipped': ''}`}>
                <div>
                    <img className='feature-img' src={img}/>
                </div>
                <div className='feature-header-text'>
                    {title}
                </div>
            </Pane>
            <Pane className='feature-body'>
                <Pane className='feature-body-inner' elevation={1}>
                    <p>{body}</p>
                </Pane>
            </Pane>
        </Pane>
    )
}

export default Feature