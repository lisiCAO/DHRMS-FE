import React from 'react';

const ErrorComponent = ({message}) => {
    return (
        <div>
            <h1>Oops! Something went wrong.</h1>
            <p>{message}</p>
        </div>
    );
}

export default ErrorComponent;