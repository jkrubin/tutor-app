import React from 'react'
import { useSelector } from 'react-redux'
const HomePage = (props) =>{
    const user = useSelector(state => state.user)
    
    return (
        <div>
            Hello World
        </div>
    )
}

export default HomePage