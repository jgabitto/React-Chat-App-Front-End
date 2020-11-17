import React, { useReducer, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';

import AuthContext from '../contexts/AuthContext';
import { StyledWrapSignIn } from './styles/styles';


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

const ACTIONS = {
  SET_EMAIL: 'email',
  SET_PASSWORD: 'password',
  SET_ERROR: 'error'
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_EMAIL:
      return { ...state, [action.payload.field]: action.payload.value }
    case ACTIONS.SET_PASSWORD:
      return { ...state, [action.payload.field]: action.payload.value }
    case ACTIONS.SET_ERROR:
      return { ...state, [action.payload.field]: action.payload.value }
  }
}

const SignIn = ({ firebase, history }) => {
  const [logIn, setLogIn] = useState({})
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const { email, password, error } = state;
  const [authUser, setAuthUser] = useContext(AuthContext);

  const isInvalid = password === '' || email === '';

  // useEffect(() => {
  //   if (!_.isEmpty(logIn)) {
  //     setAuthUser(logIn);
  //   }
  // }, [logIn])

  const onSubmit = async (event) => {
    // event.persist();
    event.preventDefault();

    const form = {
      email,
      password
    }

    const res = await fetch(process.env.REACT_APP_SIGN_IN, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' }
    })
    const { message } = await res.json();
    console.log(message)
    const token = res.headers.get('Authorization');
    setAuthUser(token);
    // setLogIn(token);

    if (res.status !== 200) dispatch({ type: ACTIONS.SET_ERROR, payload: { field: ACTIONS.SET_ERROR, value: message } });

  }

  const onChange = (e) => {
    dispatch({ type: e.target.name, payload: { field: e.target.name, value: e.target.value } })
  }

  return (
    <StyledWrapSignIn>
      <header className="masthead">
        <div className="container d-flex h-100 align-items-center">
          <div className="mx-auto text-center">
            <h1>Sign In</h1>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <input className="form-control" name="email" value={email} onChange={onChange} type="email" placeholder="Enter email" autoComplete="off" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <input className="form-control" name="password" value={password} onChange={onChange} type="password" placeholder="Password" />
              </Form.Group>
              <button className="btn btn-outline-light" disabled={isInvalid} type="submit">
                Submit
              </button>
              <Form.Label>{error ? error : null}</Form.Label>
            </Form>
          </div>
        </div>
      </header>
    </StyledWrapSignIn>
  )

}

export default SignIn;
