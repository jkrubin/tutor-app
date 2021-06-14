import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Popover,
    Pane,
    Avatar,
    Button
}from 'evergreen-ui'
import Cookies from 'universal-cookie'
import * as AuthActions from '../../redux/auth/actions'
const Profile = (props) => {
    const auth = useSelector(state => state.auth)
    const d = useDispatch()
    const [showPane, setShowPane] = useState(false)
    const togglePane = () =>{
        setShowPane(!showPane)
    }
    const handleLogout = () =>{
        const cookies = new Cookies();
        d(AuthActions.logout())
        cookies.set('auth', false)
    }
    return (
        <Popover
            content={
                <Pane elevation={2} padding='10px'>
                    <h2>Profile</h2>
                    <p>{auth.user.name}</p>
                    <Button onClick={()=>{setShowPane(false)}}>Close</Button>
                    <Button onClick={handleLogout}>Logout</Button>
                </Pane>
            }
            isShown={showPane}
        >
            <div>
                <Avatar size={45} name={auth.user.name} onClick={togglePane}></Avatar>
            </div>
        </Popover>
    )

}

export default Profile