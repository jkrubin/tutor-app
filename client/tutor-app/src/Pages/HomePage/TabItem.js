import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom } from '@fortawesome/free-solid-svg-icons'
const TabItem = ({display, id, isHovered, icon, link, isMobile, hoverCB}) =>{
    return(
        <Link 
            to={link}
            onMouseEnter={()=>{hoverCB(id)}}
            onMouseLeave={()=>{hoverCB(false)}}
        >
            {!isMobile &&
                <div className={`tab-cover ${isHovered? 'cover-active' : ''}`}>
                    <div className='FA-icon tab-cover-icon'>
                        <FontAwesomeIcon icon={faAtom} />
                    </div>
                </div>
            }
            <div className={`tab-item ${isMobile? 'hamburger-tab' : ''} ${isHovered? 'tab-hovered' : ''}`}>
                <h3>{display}</h3>
                <div className='tab-icon FA-icon'>
                    <FontAwesomeIcon icon={icon} />
                </div>
            </div>
        </Link>
    )
}
export default TabItem