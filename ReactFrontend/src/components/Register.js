import React, { useState } from 'react'
import { handle_login, handle_register } from '../services'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { error_message, success_message, user_state } from '../global_state'

const Register = () => {

    const [first_name, set_first_name] = useState('')
    const [last_name, set_last_name] = useState('')
    const [email, set_email] = useState('')
    const [password, set_password] = useState('')

    const [user, set_user] = useRecoilState(user_state)
    const [success, set_success] = useRecoilState(success_message)
    const [error, set_error] = useRecoilState(error_message)

    const history = useHistory()

    const handle_submit = async (e) => {
        e.preventDefault()
        const data = {first_name, last_name, email, password}
        try{
            const response = await handle_register(data);
            // console.log(response);

            // authenticate the user
            const loginresponse = await handle_login({email, password});
            set_user(loginresponse);
            
            history.push('/')
            set_success('Successfully registered!')
            setTimeout(() => {
                set_success('')
              }, 4000);

        }catch(err){
            console.log(err);
            set_error('User with this email already exists!')
            setTimeout(() => {
                set_error('')
            }, 4000);
        }
    }

    return(
        <div className='d-flex flex-column h-100'>

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
            
            <div className='h-100 mt-4 m-auto'>
                <form style={{width:400}} onSubmit={handle_submit}>
                    
                <p className='h3 text-primary text-center mb-4'>
                    REGISTER
                </p>

                    <input 
                        className='form-control  mt-3 '
                        type='text'
                        placeholder='First Name'
                        value={first_name}
                        onChange={(e)=>set_first_name(e.target.value)}
                    />

                    <input 
                        className='form-control  mt-3 '
                        type='text'
                        placeholder='Last Name'
                        value={last_name}
                        onChange={(e)=>set_last_name(e.target.value)}
                    />

                    <input 
                        className='form-control  mt-3  '
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>set_email(e.target.value)}
                    />

                    <input 
                        className='form-control mt-3 '
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>set_password(e.target.value)}
                    />


                    <div className='text-center  mt-3 '>
                        <button className='btn btn-primary w-50'> Register </button>
                    </div>
                    <br/>
                    <a href='/login' >Login instead?</a>
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

export default Register;
