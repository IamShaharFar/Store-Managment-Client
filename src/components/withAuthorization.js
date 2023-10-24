import React from 'react';
import Unauthorized from './Unauthorized/Unauthorized';

function withAuthorization(WrappedComponent) {
    return function(props) {
        const isLogged = localStorage.getItem("jwtToken");

        if (isLogged) {
            return <WrappedComponent {...props} />;
        } else {
            return <Unauthorized />;
        }
    }
}

export default withAuthorization;
