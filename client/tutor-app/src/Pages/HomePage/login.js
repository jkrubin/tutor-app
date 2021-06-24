import React, {useState} from 'react'
import * as req from '../../req'
import {
    Button,
    Popover,
    Pane,
    TextInputField,
    toaster
  } from 'evergreen-ui' 
import Cookies from 'universal-cookie'
import { useHistory } from 'react-router'
import {useDispatch} from 'react-redux'
import * as AuthActions from '../../redux/auth/actions'
import './login.css'
const Login = ({isMobile}) =>{
  const [loginForm, updateForm] = useState({email: '', password: ''})
  const d = useDispatch()
  const history = useHistory()
  const handleChange = (e)=>{
    const {name, value} = e.target
    updateForm((state) => {return {...state, [name]: value}})
  }
  const handleSubmit = async() =>{
    let body = {
      email: loginForm.email,
      password: loginForm.password
    }
    let res = await req.post('/api/auth/login', body)
    console.log(res)
    if(res.status === 200){
      const cookies = new Cookies();
      let auth = res.data
      d(AuthActions.login(auth))
      history.push('/')
      cookies.remove('auth')
      cookies.set('auth', auth)
      toaster.success('Welcome Back')
    }
  }
  return(
    <div className='content-login content-page'>
      <h1 className='content-header'>Log in</h1>
      <div className='login-wrapper'>
          <div className='login-body content-body'>
            <Pane elevation={2} width={300} height={250} display="flex" alignItems="center" justifyContent='center' flexDirection="column">
              <TextInputField
                name="email"
                label="Email"
                placeholder="Email"
                onChange={handleChange}/>
              <TextInputField
                name="password"
                type="password"
                label="password"
                placeholder="password"
                onChange={handleChange}/>
              <Button onClick={handleSubmit}>Login</Button>
            </Pane>
          </div>
      </div>
    </div>
  )
}

export default Login