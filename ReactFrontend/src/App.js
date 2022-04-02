import React from 'react'

import AuthRoutes from './AuthRoutes';
import NoAuthRoutes from './NoAuthRoutes';




const App = () => {

    const a = 2;
    return (
       <div>


        <NoAuthRoutes/>
        <AuthRoutes/>
        </div>
    )
}

export default App;
