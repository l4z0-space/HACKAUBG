import React from 'react'
import { useHistory } from 'react-router-dom'

const Landing = () => {
    const history = useHistory()

    return(
        <div>
            Landing
            <button onClick={(e)=>{
                e.preventDefault()
                history.push('/login')
            }}>Login</button>
            <button onClick={(e)=>{
                e.preventDefault()
                history.push('/register')
            }}>Register</button>
        </div>
    )
}

export default Landing;
