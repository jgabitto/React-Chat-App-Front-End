import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styled from 'styled-components';

import * as ROUTES from '../constants/routes';
import AuthContext from '../contexts/AuthContext';
import { StyledNavbar } from './styles/styles';


const NavbarComponent = () => {
  const [scroll, setScroll] = useState(false);
  const [authUser, setAuthUser] = useContext(AuthContext);

  const NavigationAuth = () => {
    return (
      <Navbar className={scroll ? "fixed-top mx-5 scrolled page-navbar" : "fixed-top mx-5 page-navbar"} expand="lg">
        <Navbar.Brand className="brand">
          <Nav.Link as={Link} to="/"><strong>Chat</strong></Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.JOIN_CHAT}>Chat</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.ACCOUNT}>Account</Nav.Link>
            {/* <SignOut /> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar >
    );
  }

  const NavigationNonAuth = () => {
    // return (
    //   <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
    //     <div class="container">
    //       <a class="navbar-brand js-scroll-trigger" href="#page-top">Start Bootstrap</a>
    //       <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
    //         Menu
    //                 <i class="fas fa-bars"></i>
    //       </button>
    //       <div class="collapse navbar-collapse" id="navbarResponsive">
    //         <ul class="navbar-nav ml-auto">
    //           <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">About</a></li>
    //           <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#projects">Projects</a></li>
    //           <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#signup">Contact</a></li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // );

    // style={{ backgroundColor: "#131718" }}
    return (
      <Navbar className={scroll ? "fixed-top scrolled page-navbar" : "fixed-top page-navbar"} expand="lg">
        <Navbar.Brand className="brand">
          <Nav.Link as={Link} to="/"><strong>Chat</strong></Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
      </Navbar>
    );
  }


  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.pageYOffset > 5
      if (scrollCheck) {
        return setScroll(true);
      }

      return setScroll(false);
    })
  }, [scroll])

  return (
    <StyledNavbar>
      {authUser ? <NavigationAuth /> : null}
    </StyledNavbar>
  )
  // return (
  //   <StyledNavbar>
  //     {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
  //   </StyledNavbar>
  // )
}

export default NavbarComponent;