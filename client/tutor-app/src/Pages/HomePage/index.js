import React, {useEffect, useState} from 'react'
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
    Icon,
    ShoppingCartIcon,
  } from 'evergreen-ui' 
import Login from './login'
import Profile from './profile'
import SignUp from './signup'
import Cart from '../Cart'
import Content from './Content'
import Purchases from '../Purchases'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom } from "@fortawesome/free-solid-svg-icons";
import './index.css'
const HomePage = (props) =>{
    const d = useDispatch()
    const auth = useSelector(state => state.auth)
    const cart = useSelector(state => state.cart)
    const [tabHovered, setTabHovered] = useState(0)

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
                <div className='main' >
                    <div className='header-wrapper'>
                        <TabNavigation paddingTop={15} className='header' className='header'>
                            <div className='header-logo'>
                                <div className='logo-miniborder'></div>
                                <img src={require('../../Assets/logo_1.png').default} />
                            </div>
                            <div className='header-left'>
                                <Link to="/"
                                    onMouseEnter={()=>{setTabHovered('home')}}
                                    onMouseLeave={()=>{setTabHovered(false)}}
                                    className={`tab-item ${tabHovered == 'home'? 'tab-hovered' : ''}`}
                                >
                                    <div className={`tab-cover ${tabHovered == 'home'? 'cover-active' : ''}`}>
                                        <FontAwesomeIcon icon={faAtom} size={'lg'} />
                                    </div>
                                    <Tab >Home</Tab>
                                </Link>
                                <Link to="/lessons"
                                    onMouseEnter={()=>{setTabHovered('lessons')}}
                                    onMouseLeave={()=>{setTabHovered(false)}}
                                    className={`tab-item ${tabHovered == 'lessons'? 'tab-hovered' : ''}`}>
                                    <div className={`tab-cover ${tabHovered == 'lessons'? 'cover-active' : ''}`}>
                                        <FontAwesomeIcon icon={faAtom} size={'lg'} />
                                    </div>
                                    <Tab>Lessons</Tab>
                                </Link>
                                <Link to="/" className='tab-container'
                                    onMouseEnter={()=>{setTabHovered('link')}}
                                    onMouseLeave={()=>{setTabHovered(false)}}
                                    className={`tab-item ${tabHovered == 'link'? 'tab-hovered' : ''}`}>
                                    <div className={`tab-cover ${tabHovered == 'link'? 'cover-active' : ''}`}>
                                        <FontAwesomeIcon icon={faAtom} size={'lg'} />
                                    </div>
                                    <div className='tab-item'>
                                        Link
                                    </div>
                                </Link>
                            </div>
                            <div className='header-right'>
                            {auth.isAuth?
                                <>
                                    <Link to='/cart'>
                                        <div className='cart-button right-nav-button'>
                                            <Icon icon={ShoppingCartIcon} size={30}/>
                                            <div className='cart-number'>
                                                {cart.lessons.length}
                                            </div>
                                        </div>
                                    </Link>
                                    <Profile />
                                </>
                            :   
                                <>
                                    <SignUp />
                                    <Login />
                                </>
                            }
                            </div>
                        </TabNavigation>
                    </div>
                    <div className='background' style={{}}>
                        <div className='content'> 
                            <Switch>
                                <Route path='/purchases'>
                                    <Purchases />
                                </Route>
                                <Route path='/cart'>
                                    <Cart />
                                </Route>
                                <Route path='/lessons'>
                                    <Lessons/>
                                </Route>
                                <Route path='/'>
                                    <Content />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default HomePage