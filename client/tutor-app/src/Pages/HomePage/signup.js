import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import {
    Popover,
    Pane,
    TextInputField,
    Button,
    toaster
} from 'evergreen-ui'
import { useSelector, useDispatch } from 'react-redux'
import * as AuthActions from '../../redux/auth/actions'
import * as req from '../../req'
const SignUp = (props) =>{
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: '',
    })
    const d = useDispatch()
    const [isPasswordMismatch, setIsPasswordMismatch] = useState(false)
    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
    }
    const verifyData = () =>{
        let {password, passwordConfirm} = formData
        if(password !== passwordConfirm){
            setIsPasswordMismatch(true)
            toaster.danger('passwords do no match')
            return false
        }
        return true
    }
    const handleClose = () =>{
        setFormData({
            email: '',
            password: '',
            passwordConfirm: '',
            firstName: '',
            lastName: '',
        })        
    }
    const handleSubmit = async () =>{
        const {firstName, lastName, email, password} = formData
        if(verifyData()){
            let payload = {
                email,
                name: `${firstName} ${lastName}`,
                password
            }
            d(AuthActions.setIsLoading(true))
            let res = await req.post('/api/auth/register', payload)
            if(res.status === 200){
                const cookies = new Cookies();
                let auth = res.data
                d(AuthActions.login(auth))
                cookies.set('auth', auth)
                d(AuthActions.setIsLoading(false))
                toaster.notify('Account Created')
            }
        }
    }
    return (
        <Popover
        onClose={handleClose}
        content={({close})=>(
          <Pane width={300} height={500} display="flex" alignItems="center" justifyContent='center' flexDirection="column">
            <TextInputField
              name="email"
              label="Email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}/>
            <TextInputField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              placeholder="first name"
              onChange={handleChange}/>
            <TextInputField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={handleChange}/>
            <TextInputField
              name="password"
              type="password"
              label="password"
              value={formData.password}
              placeholder="password"
              onChange={handleChange}/>
            <TextInputField
              name="passwordConfirm"
              type="password"
              label="Confirm Password"
              value={formData.passwordConfirm}
              placeholder="Confirm Password"
              onChange={handleChange}/>

            <Button onClick={handleSubmit}>Sign Up</Button>
            <Button onClick={()=>{handleClose(); close()}}>Cancel</Button>
          </Pane>
        )} >
          <Button>Sign Up</Button>
      </Popover>
    )
}

export default SignUp