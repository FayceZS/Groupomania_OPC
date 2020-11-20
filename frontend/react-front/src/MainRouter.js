import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import Signin from './user/Signin'
import Signup from './user/Signup'
import Profile from './user/Profile'
import Users from './user/Users'
import EditProfile from './user/editProfile'
import PrivateRoute from './auth/privateRoutes'

const MainRouter = () => (

    <div>

        <Menu />
        <Switch>
            
            <Route exact path='/' component={Home}></Route>
            <PrivateRoute exact path='/users' component={Users}></PrivateRoute>
            <Route exact path='/signup' component={Signup}></Route>
            <Route exact path='/signin' component={Signin}></Route>
            <PrivateRoute exact path='/user/edit/:userId' component={EditProfile}></PrivateRoute>
            <PrivateRoute exact path='/user/:userId' component={Profile}></PrivateRoute>
        </Switch>
    </div>
)

export default MainRouter