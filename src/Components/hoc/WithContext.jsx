import React from 'react';
import AuthContext from '../Authentication/AuthContext';

const WithContext = Component => {
    return props => {
        return (
            <AuthContext.Consumer>
                {
                    ({isAuthenticated, toggleAuth, authUsername, logout}) => <Component isAuthenticated={isAuthenticated} logout={logout} authUsername={authUsername} toggleAuth={toggleAuth} />
                }
            </AuthContext.Consumer>
        )
    }
}

export default WithContext;