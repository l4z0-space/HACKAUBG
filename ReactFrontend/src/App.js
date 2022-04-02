import React from 'react'

import AuthRoutes from './AuthRoutes';
import NoAuthRoutes from './NoAuthRoutes';

import './styles/index.css'



const App = () => {

    const a = 2;
    return (
       <div className=''>

            <NoAuthRoutes/>
            <AuthRoutes/>
        </div>
    )
}

export default App;
