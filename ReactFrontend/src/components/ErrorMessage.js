import React from 'react'

const ErrorMessage = ({message}) => {
    return (
        <>

        <div className="alert alert-danger d-flex align-items-center" role="alert">
        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"></svg>
        <div>
            {message}
        </div>
        </div>

        </>

    )
}

export default ErrorMessage;
