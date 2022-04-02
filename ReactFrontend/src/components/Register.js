import React, { useState } from 'react'

const Register = () => {

    const [first_name, set_first_name] = useState('')
    const [last_name, set_last_name] = useState('')
    const [email, set_email] = useState('')
    const [password, set_password] = useState('')

    const handle_submit = (e) => {
        e.preventDefault()
        const data = {email, passsword}
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
                    
                    <p className='h4 text-center'>
                    Register
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
                </form>
            </div>
            
        </div>
    )
}

export default Register;
