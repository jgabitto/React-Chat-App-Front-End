import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import * as ROUTES from '../constants/routes';
import AuthContext from '../contexts/AuthContext';

const LogOut = ({ history }) => {
  const [authUser, setAuthUser] = useContext(AuthContext);

  const logout = async () => {
    await fetch(process.env.REACT_APP_LOG_OUT, {
      mode: 'cors',
      credentials: 'include'
    })
    setAuthUser(null)
  }

  return (
    <Nav.Link as={Link} to="#" onClick={logout}>Logout</Nav.Link>
  )
}

export default LogOut;