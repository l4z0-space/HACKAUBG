import React from 'react'

import { Route, Switch } from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';


const AuthRoutes = () => {
    return (
        <Switch>
            <Route exact path={'/me'} component={Landing}/>
        </Switch>
    )
}

export default AuthRoutes;
