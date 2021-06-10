import React from 'react'
import { useSelector } from 'react-redux'
import Lessons from '../Lessons'
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
const HomePage = (props) =>{
    const user = useSelector(state => state.user)
    return (
        <div>
            <Router>
                <div>
                    <TabNavigation>
                        <Tab>
                            <Link to="/">Home</Link>
                        </Tab>
                        <Tab>
                            <Link to="/lessons">Lessons</Link>
                        </Tab>
                    </TabNavigation>
                    <Switch>
                        <Route path='/lessons'>
                            <Lessons/>
                        </Route>
                        <Route path='/'>
                            <div>
                                placeholder homepage
                                <p>user is {user.name}</p>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default HomePage