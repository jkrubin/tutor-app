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
import * as CartActions from '../../redux/cart/actions'
import { useHistory } from 'react-router'
const Profile = (props) => {
    const auth = useSelector(state => state.auth)
    const d = useDispatch()
    const history = useHistory()
    const handleLogout = () =>{
        const cookies = new Cookies();
        d(AuthActions.logout())
        d(CartActions.clearCart())
        cookies.set('auth', false)
    }
    return (
        <Popover
            content={ ({close}) => (
                <Pane elevation={2} padding='10px'>
                    <h2>Profile</h2>
                    <p>{auth.user.name}</p>
                    <Button onClick={()=>{close()}}>Close</Button>
                    <Button onClick={()=>{history.push('/purchases')}}>Purchases</Button>
                    <Button onClick={() =>{handleLogout(); close()}}>Logout</Button>
                </Pane>
            )}
        >
            <div className='profile-button right-nav-button'>
                <Avatar size={45} name={auth.user.name}></Avatar>
            </div>
        </Popover>
    )

}

export default Profile