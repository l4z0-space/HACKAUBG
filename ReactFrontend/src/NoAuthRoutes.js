import React from 'react'

import { Switch, Route } from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Register from './components/Register';


const NoAuthRoutes = () => {
    return (
        <Switch>
            <Route exact path={'/'} component={Landing}/>
            <Route exact path={'/login'} component={Login}/>
            <Route exact path={'/register'} component={Register}/>
            <Route component={NotFound}/>
        </Switch>
    )
}

export default NoAuthRoutes;
