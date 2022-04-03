import React from 'react'

import AuthRoutes from './AuthRoutes';
import NoAuthRoutes from './NoAuthRoutes';
import './styles/index.css'
import { useRecoilState, useRecoilValue } from 'recoil'
import { error_message, is_loading, success_message, user_state } from './global_state';
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import Logout from './components/Logout';


const App = () => {
    const [error, set_error] = useRecoilState(error_message)
    const [success, set_success] = useRecoilState(success_message)
    const loading = useRecoilValue(is_loading)
    const user = useRecoilValue(user_state)

    return (
       <div>
           {user && <Logout/>} 
           {success ? <SuccessMessage  message={success}/> :null }
           {error ? <ErrorMessage  message={error}/> :null }
           {user ?  <AuthRoutes/> : <NoAuthRoutes/>}
            
        </div>
    )
}

export default App;
