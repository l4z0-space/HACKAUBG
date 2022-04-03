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
        <div className='d-flex flex-column '>

                <div className='text-center mb-4 bg-dark-img w-100 align-items-center'>
                    <img 
                        width={200}
                        src='https://github.com/l4z0-space/cdn/blob/master/logowhite.png?raw=true' 
                    />
                    <br/>
                    
                    <img
                        src='https://raw.githubusercontent.com/l4z0-space/cdn/a48d869cd31fba2948e144eb5811bc6332b361a8/welcome.svg'
                    />
                    <br/>
                    <p className='text-white mt-4 fw-300'>
                        Create an account to join in our platform.
                    </p>
                </div>
            
            <br/>
            <br/>
            <br/>
            <div className='h-100 mt-4 m-auto'>
                
                <form style={{width:400}} onSubmit={handle_submit}>
                    

                    <p className='h3 text-primary text-center mb-4'>
                        LOG IN
                    </p>

                    <input 
                        className='form-control'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>set_email(e.target.value)}
                    />
                    <input 
                        className='form-control mt-3'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>set_password(e.target.value)}
                    />
                    <div className='text-center mt-3'>
            
                        <button className='btn btn-primary w-50'> Login </button>
                    </div>
                </form>
                <br/>
                <br/>
                <div className='text-center mt-4'>
                    <img width={150} src='https://github.com/l4z0-space/cdn/blob/master/Picture1.png?raw=true' />
                </div>
            </div>
            
        </div>
    )
}

export default Login;
