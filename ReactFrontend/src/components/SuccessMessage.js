import React from 'react'

const SuccessMessage = ({message}) => {
    return (
        <>

        <div class="alert alert-success d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"></svg>
        <div>
            {message}
        </div>
        </div>

        </>

    )
}

export default SuccessMessage;
