import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AuthContext from '../contexts/AuthContext';
import { StyledWrapLanding } from './styles/styles';

const Landing = () => {
  const [authUser, setAuthUser] = useContext(AuthContext);

  return (
    <StyledWrapLanding>
      <header class="masthead">
        <div class="container d-flex h-100 align-items-center">
          {!authUser ? <div class="mx-auto text-center">
            <h1 class="mx-auto my-0">Web Chat App</h1>
            <h2 class="mx-auto mt-2 mb-5">Create a chat room or join an exisiting one. Register to start chatting today!</h2>
            <Link to="/signin" className="btn btn-outline-light js-scroll-trigger mr-1">Sign In</Link>
            <Link to="/signup" className="btn btn-outline-light js-scroll-trigger ml-1" variant="outline-dark">Sign Up</Link>
          </div>
            : <div class="mx-auto text-center">
              <h1 class="mx-auto my-0">Web Chat App</h1>
              <h2 class="mx-auto mt-2 mb-5">Create a chat room or join an exisiting one. Register to start chatting today!</h2>
            </div>}
        </div>
      </header>
    </StyledWrapLanding>
  )
  // return (
  //   <StyledWrap>
  //     <Jumbotron>
  //       <h1>Hello!</h1>
  //       <p>
  //         You can save and bookmark your favorite websites. You can also check the weather forecast for the next week! Create an account to start!
  //       </p>
  //     </Jumbotron>
  //   </StyledWrap>
  // )
}

export default Landing;