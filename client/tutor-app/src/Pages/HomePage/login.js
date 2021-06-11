import React, {useState} from 'react'
import * as req from '../../req'
import {
    Button,
    Popover,
    Pane,
    TextInputField
  } from 'evergreen-ui' 
import Cookies from 'universal-cookie';
import {useDispatch} from 'react-redux'
import * as AuthActions from '../../redux/auth/actions'
const Login = (props) =>{
  const [loginForm, updateForm] = useState({email: '', password: ''})
  const d = useDispatch()

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
    console.log('login: ', res.status, res.data)
    if(res.status === 200){
      const cookies = new Cookies();
      let auth = res.data
      console.log('dispatching')
      d(AuthActions.login(auth))
      cookies.set('auth', auth)
    }
  }
  return(
    <Popover
      content={
        <Pane width={300} height={250} display="flex" alignItems="center" justifyContent='center' flexDirection="column">
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
      } >
        <Button>Login</Button>
    </Popover>
  )
}

export default Login