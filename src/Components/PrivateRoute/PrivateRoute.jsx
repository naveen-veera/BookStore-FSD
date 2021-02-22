import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../Authentication/AuthContext';
import WithContext from '../hoc/WithContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(rest);

    return <Route {...rest} render={(props) => (
              rest.isAuth === true
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }} />
            )} />
  }
  
export default PrivateRoute;