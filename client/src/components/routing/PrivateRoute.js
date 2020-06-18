import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { auth } from '../../actions/auth';

const PrivateRoute = ({ component: Component, auth : {isAuthenticated, loading},...rest}) => (
    <Route 
    {...rest} 
    render={props =>
         !isAuthenticated && !loading ?
         (<Redirect to='/login'/> ) :
         (<Component {...props}/>)}/>
);


  const mapStateToProps = state => ({
    auth: state.user
  });

  export default connect(mapStateToProps)(PrivateRoute);