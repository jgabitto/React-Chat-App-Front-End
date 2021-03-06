import React, { useReducer, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';

import AuthContext from '../contexts/AuthContext';
import { StyledWrapSignUp } from './styles/styles';

// const StyledWrap = styled.div`
//     margin-top: 8rem;

// `;

const INITIAL_STATE = {
  email: '',
  username: '',
  password: '',
  passwordTwo: '',
  error: null
}

const ACTIONS = {
  SET_EMAIL: 'email',
  SET_USERNAME: 'username',
  SET_PASSWORD_ONE: 'password',
  SET_PASSWORD_TWO: 'passwordTwo',
  SET_ERROR: 'error'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_EMAIL:
      return { ...state, [action.payload.field]: action.payload.value }
    case ACTIONS.SET_USERNAME:
      return { ...state, [action.payload.field]: action.payload.value }
    case ACTIONS.SET_PASSWORD_ONE:
      return { ...state, [action.payload.field]: action.payload.value }
    case ACTIONS.SET_PASSWORD_TWO:
      return { ...state, [action.payload.field]: action.payload.value }
    case ACTIONS.SET_ZIPCODE:
      return { ...state, [action.payload.field]: action.payload.value }
    case ACTIONS.SET_ERROR:
      return { ...state, [action.payload.field]: action.payload.value }
  }
}

const Signup = () => {
  const [logIn, setLogIn] = useState({})
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const { email, username, password, passwordTwo, error } = state;
  const [authUser, setAuthUser] = useContext(AuthContext);

  const isInvalid =
    password !== passwordTwo ||
    password === '' ||
    email === '' ||
    username === '';

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
      username,
      password
    }

    try {
      const res = await fetch(process.env.REACT_APP_SIGN_UP, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' }
      });

      const token = res.headers.get('Authorization');

      setAuthUser(token);
      // setLogIn(token)
      if (res.status !== 200) dispatch({ type: ACTIONS.SET_ERROR, payload: { field: ACTIONS.SET_ERROR, value: 'User already exists with that email' } });

    } catch (e) {
      console.log(e.message)
    }
  }

  const onChange = (e) => {
    dispatch({ type: e.target.name, payload: { field: e.target.name, value: e.target.value } })
  }

  return (
    <StyledWrapSignUp>
      <header className="masthead">
        <div className="container d-flex h-100 align-items-center">
          <div className="mx-auto text-center">
            <h1>Sign Up</h1>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <input className="form-control" name="username" value={username} onChange={onChange} type="text" placeholder="Enter username" autoComplete="off" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <input className="form-control" name="email" value={email} onChange={onChange} type="email" placeholder="Enter email" autoComplete="off" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <input className="form-control" name="password" value={password} onChange={onChange} type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <input className="form-control" name="passwordTwo" value={passwordTwo} onChange={onChange} type="password" placeholder="Password" />
              </Form.Group>
              <button className="btn btn-outline-light" disabled={isInvalid} type="submit">
                Submit
              </button>
              <Form.Label>{error ? error : null}</Form.Label>

            </Form>
          </div>
        </div>
      </header>
    </StyledWrapSignUp>
  )

  // return (
  //   <StyledWrap className="container">
  //     <Jumbotron>
  //       <h1>Sign Up</h1>
  //       <Form onSubmit={onSubmit}>
  //         <Form.Group controlId="formBasicEmail">
  //           <Form.Label>Username</Form.Label>
  //           <input className="form-control" name="username" value={username} onChange={onChange} type="text" placeholder="Enter email" />
  //         </Form.Group>
  //         <Form.Group controlId="formBasicEmail">
  //           <Form.Label>Email address</Form.Label>
  //           <input className="form-control" name="email" value={email} onChange={onChange} type="email" placeholder="Enter email" />
  //         </Form.Group>
  //         <Form.Group controlId="formBasicPassword">
  //           <Form.Label>Password</Form.Label>
  //           <input className="form-control" name="password" value={password} onChange={onChange} type="password" placeholder="Password" />
  //         </Form.Group>
  //         <Form.Group controlId="formBasicPassword">
  //           <Form.Label>Confirm Password</Form.Label>
  //           <input className="form-control" name="passwordTwo" value={passwordTwo} onChange={onChange} type="password" placeholder="Password" />
  //         </Form.Group>
  //         <Button variant="primary" disabled={isInvalid} type="submit">
  //           Submit
  //   </Button>
  //         {error && <p>{error.message}</p>}
  //       </Form>
  //     </Jumbotron>
  //   </StyledWrap>
  // )
}

export default Signup;