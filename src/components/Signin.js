import React, { useReducer, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';

import AuthContext from '../contexts/AuthContext';

const StyledWrap = styled.div`
    margin-top: 8rem;

`;

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

  useEffect(() => {
    if (!_.isEmpty(logIn)) {
      setAuthUser(logIn);
    }
  }, [logIn])

  const onSubmit = async (event) => {
    // event.persist();
    event.preventDefault();

    const form = {
      email,
      password
    }

    const res = await fetch('http://localhost:5000/signIn', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' }
    })

    const token = res.headers.get('Authorization');

    setLogIn(token)

  }

  const onChange = (e) => {
    dispatch({ type: e.target.name, payload: { field: e.target.name, value: e.target.value } })
  }

  return (
    <StyledWrap className="container">
      <Jumbotron>
        <h1>Sign In</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <input className="form-control" name="email" value={email} onChange={onChange} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <input className="form-control" name="password" value={password} onChange={onChange} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" disabled={isInvalid} type="submit">
            Submit
      </Button>
          {error && <p>{error.message}</p>}
        </Form>
      </Jumbotron>
    </StyledWrap>
  )

}

export default SignIn;
