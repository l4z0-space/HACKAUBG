import React from 'react'

import { Route, Switch } from "react-router-dom";
import AllTransactions from './components/AllTransactions';
import Home from './components/Home';
import Landing from './components/Landing';
import NotFound from './components/NotFound';


const AuthRoutes = () => {
    return (
        <Switch>
            <Route exact path={'/me'} component={Landing}/>
            <Route exact path={'/'} component={Home}/>
            <Route exact path={'/transactions'} component={AllTransactions}/>
            <Route component={NotFound}/>
        </Switch>
    )
}

export default AuthRoutes;
