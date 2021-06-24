import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Lessons from '../Lessons'
import * as req from '../../req'
import {useDispatch} from 'react-redux'
import Cookies from 'universal-cookie';
import * as AuthActions from '../../redux/auth/actions'
import * as PurchaseActions from '../../redux/purchases/actions'
import * as CartActions from '../../redux/cart/actions'
import * as lessonsActions from '../../redux/lessons/actions'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"
import{
    TabNavigation,
    Button
  } from 'evergreen-ui' 
import Login from './login'
import Profile from './profile'
import SignUp from './signup'
import Cart from '../Cart'
import Content from './Content'
import TabItem from './TabItem'
import Purchases from '../Purchases'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom, faBars, faTimes, faHome, faChalkboardTeacher, faShoppingCart, faUser, faHistory} from "@fortawesome/free-solid-svg-icons";
import './index.css'
const HomePage = (props) =>{
    const d = useDispatch()
    const auth = useSelector(state => state.auth)
    const cart = useSelector(state => state.cart)
    const [tabHovered, setTabHovered] = useState(0)
    const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight})
    const [showHamburger, setShowHamburger] = useState(false)
    const tabs = [
        {
            display:'Home',
            id:'home',
            icon:faHome,
            link:'/',
            isShown: true
        },
        {
            display:'Lessons',
            id:'lessons',
            icon:faChalkboardTeacher,
            link:'/lessons',
            isShown: true
        },
        {
            display:`Cart (${cart.lessons.length})`,
            id:'cart',
            icon:faShoppingCart,
            link:'/cart',
            isShown: auth.isAuth
        },
        {
            display:'Profile',
            id:'prof',
            icon:faUser,
            link:'/profile',
            isShown: auth.isAuth 
        },
        {
            display:'Purchases',
            id:'purchases',
            icon:faHistory,
            link: '/purchases',
            isShown: auth.isAuth
        },
        {
            display:'Log in',
            id:'login',
            icon:faUser,
            link:'/login',
            isShown: !auth.isAuth  
        },
        {
            display:'Sign Up',
            id:'signup',
            icon:faUser,
            link:'/signup',
            isShown: !auth.isAuth  
        }
    ]
    useEffect(()=>{
        const measureWindow = () =>{
            setWindowSize({width: window.innerWidth, height: window.innerHeight})
        }
        window.addEventListener('resize', measureWindow)

        return () =>{
            window.removeEventListener('resize', measureWindow)
        }
    },[])
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
    useEffect(()=>{
        const callAPI = async()=>{
            d(lessonsActions.setLoading(true))
            let data = await req.get('/api/lesson')
            d(lessonsActions.getLessons(data.data))
            let purchased = await req.get('/api/purchase/lessons')
            d(lessonsActions.getPurchased(purchased.data))
            d(lessonsActions.setLoading(false))
        }
        callAPI()
    },[])
    const handleLogout = () =>{
        d(AuthActions.logout())
        d(PurchaseActions.clearPurchases())
        d(CartActions.clearCart())
        const cookies = new Cookies();
        cookies.remove('auth')
    }
    const tabMenu = tabs
        .filter(tab => tab.isShown)
        .map(tab=> <TabItem {...tab} isHovered={tab.id === tabHovered} isMobile={false} hoverCB={setTabHovered} key={tab.id}/>)
    const hamburgerMenu = tabs
        .filter(tab => tab.isShown)
        .map(tab=> <TabItem {...tab} isHovered={tab.id === tabHovered} isMobile={true} hoverCB={setTabHovered} key={tab.id}/>)
    return (
        <div>
            <Router>
                <div className='main' >
                    <div className='header-wrapper'>
                        <TabNavigation paddingTop={15} className='header' className='header'>
                            <Link to="/">
                                <div className='header-logo'>
                                    {windowSize.width > 600 || true?
                                            <>
                                                <div className='logo-miniborder'></div>
                                                <div className='logo-container' style={{background: `url(${require('../../Assets/logo_1.png').default})`}} />
                                            </>
                                            :
                                                <div className='logo-container' style={{background: `url(${require('../../Assets/logo_2.png').default})`}} />
                                        }
                                </div>
                            </Link>
                            <div className='header-content'>
                                {windowSize.width > 600 ? 
                                    <>
                                        {tabMenu}
                                        {auth.isAuth &&
                                            <Button className='main-button' onClick={()=>{handleLogout()}}>Log Out</Button>
                                        }
                                    </>
                                : 
                                    <>
                                    <div onClick={()=>{setShowHamburger(!showHamburger)}} className='hamburger-button'>
                                        <h3>Menu</h3>
                                        <div className={`hamburger-button-icon FA-icon ${showHamburger? 'hamburger-show' : ''}`} >
                                            <FontAwesomeIcon icon={showHamburger? faTimes: faBars} />
                                        </div>
                                    </div>
                                    <div className={`hamburger-menu ${showHamburger? 'show-menu' : ''}`}>
                                        <div className='hamburger-menu-content'>
                                            {hamburgerMenu}
                                            <div className='hamburger-close-button'>
                                                <Button className='main-button' onClick={()=>{setShowHamburger(false)}}>Close</Button> 
                                            </div>
                                        </div>
                                    </div>
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
                                <Route path='/purchases'>
                                    <Purchases />
                                </Route>
                                <Route path='/login'>
                                    <Login />
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