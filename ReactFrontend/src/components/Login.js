import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { error_message, success_message, user_state } from '../global_state'
import { handle_login } from '../services'
import { useHistory } from 'react-router-dom'

const Login = () => {

    const [email, set_email] = useState('')
    const [password, set_password] = useState('')
    const history = useHistory()
    const [user, set_user] = useRecoilState(user_state)

    const [success, set_success] = useRecoilState(success_message)
    const [error, set_error] = useRecoilState(error_message)

    const handle_submit = async (e) => {
        e.preventDefault()
        const data = {email, password}
        try{
            const response = await handle_login(data);
            // console.log(response);
            set_user(response);
            history.push('/')
            set_success('Successfully logged in!')
            setTimeout(() => {
                set_success('')
            }, 4000);
        }catch(err){
            console.log(err);
            set_error('Incorrect credentials!')
            setTimeout(() => {
                set_error('')
            }, 4000);
        }
    }

    useEffect(()=>{
        if(user){
            history.push('/')
        }
    },[user])

    return(
        <div className='d-flex flex-column h-100'>

            <div className='bg-dark-img w-100 h-25'>
        
            </div>
            
            <br/>
            <br/>
            <br/>
            <div className='h-100 mt-4 m-auto'>
                <form className='w-100' onSubmit={handle_submit}>
                    
                    <p className='h3  text-center'>
                        Login
                    </p>

                    <input 
                        className='form-control '
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>set_email(e.target.value)}
                    />
                    <input 
                        className='form-control w-100 mt-3'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>set_password(e.target.value)}
                    />
                    <div className='text-center mt-3'>
            
                        <button className='btn btn-primary w-50'> Login </button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default Login;
