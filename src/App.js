import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login';
import Customers from './Customers';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

export default function App() {
  return (    
    <Router>
      <div>
        <Switch>
          <PublicRoute path="/login" component={Login}></PublicRoute>
          <PrivateRoute path="/customers" component={Customers} ></PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}



