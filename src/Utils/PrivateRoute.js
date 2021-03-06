import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';

function PrivateRoute({ component: Component }) {
  return (
    <Route
      render={(props) => getToken() ? <Component /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}
 
export default PrivateRoute;