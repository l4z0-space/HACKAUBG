import React, { useState } from 'react'

const Login = () => {

    const [email, set_email] = useState('')
    const [password, set_password] = useState('')

    const handle_submit = (e) => {
        e.preventDefault()
        const data = {email, password}
        console.log(data);
    }

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
