import React from 'react'
import { useRecoilState } from 'recoil'
import { user_state } from '../global_state'

const Logout = () => {
    const [user, set_user] = useRecoilState(user_state)
    const handle_logout = (e) => {
        e.preventDefault();
        set_user(null);
    }

    return (
        <div style={{textAlign: 'right'}} className=' w-100'>
            <button onClick={handle_logout} className='btn btn-danger'>Logout</button>
        </div>
    )
}

export default Logout;
