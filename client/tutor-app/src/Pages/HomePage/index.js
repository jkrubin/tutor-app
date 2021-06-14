import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Lessons from '../Lessons'
import * as req from '../../req'
import {useDispatch} from 'react-redux'
import Cookies from 'universal-cookie';
import * as AuthActions from '../../redux/auth/actions'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"
import{
    TabNavigation,
    Tab,
  } from 'evergreen-ui' 
import Login from './login'
import Profile from './profile'
import SignUp from './signup'
import './index.css'
const HomePage = (props) =>{
    const d = useDispatch()
    const auth = useSelector(state => state.auth)
    const history = useHistory()
    useEffect(()=>{
        const tokenLogin = async(token)=>{
            d(AuthActions.setIsLoading(true))
            let res = await req.post('/api/auth/tokenLogin', {}, {headers:{'x-access-token': token}})
            if(res.status ===200){
                let auth = res.data
                d(AuthActions.login(auth))
                const cookies = new Cookies();
                cookies.set('auth', auth)
            }
            d(AuthActions.setIsLoading(false))
        }
        if(!auth.isAuth && auth.token){
            tokenLogin(auth.token)
        }
    }, [])
    return (
        <div>
            <Router>
                <div className='main'>
                    <TabNavigation paddingTop={15} className='header'>
                        <Tab onSelect={()=>{history.push('/')}}>
                            <Link to="/">Home</Link>
                        </Tab>
                        <Tab onSelect={()=>{history.push('/lessons')}}>
                            <Link to="/lessons">Lessons</Link>
                        </Tab>
                        <div className='manual-tab'>
                        {auth.isAuth?
                            <>
                            <Profile />
                            {/*ToDo Cart here*/}
                            </>
                        :   
                            <>
                                <SignUp />
                                <Login />
                            </>
                        }
                        </div>
                    </TabNavigation>
                    <div className='content'> 
                        <Switch>
                            <Route path='/lessons'>
                                <Lessons/>
                            </Route>
                            <Route path='/'>
                                <div>
                                    placeholder homepage
                                </div>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default HomePage