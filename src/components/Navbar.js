import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styled from 'styled-components';

import * as ROUTES from '../constants/routes';
import LogOut from './LogOut';
import AuthContext from '../contexts/AuthContext';
import LocationContext from '../contexts/LocationContext';
import UserContext from '../contexts/UserContext';
import { StyledNavbar } from './styles/styles';


const NavbarComponent = () => {
  const [scroll, setScroll] = useState(false);
  const [authUser, setAuthUser] = useContext(AuthContext);
  const [chatLocation, setChatLocation] = useContext(LocationContext);
  const [chatUser, setChatUser] = useContext(UserContext);

  const NavigationAuth = () => {
    return (
      <Navbar className={chatLocation ? "scrolled dark page-navbar" : "fixed-top mx-5 page-navbar"} expand="lg">
        <Navbar.Brand className="brand">
          <Nav.Link as={Link} to="/"><strong>ChatApp</strong></Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {/* <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link> */}
            <Nav.Link as={Link} to={chatUser ? `/chat/username=${chatUser.username}&room=${chatUser.room}` : ROUTES.JOIN_CHAT}>Chatroom</Nav.Link>
            <LogOut />
            {/* <Nav.Link as={Link} to={ROUTES.ACCOUNT}>Account</Nav.Link> */}
            {/* <SignOut /> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar >
    );
  }

  const NavigationNonAuth = () => {
    return (
      <Navbar className={scroll ? "fixed-top scrolled page-navbar" : "fixed-top page-navbar"} expand="lg">
        <Navbar.Brand className="brand">
          <Nav.Link as={Link} to="/"><strong>ChatApp</strong></Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
      {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </StyledNavbar>
  )
  // return (
  //   <StyledNavbar>
  //     {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
  //   </StyledNavbar>
  // )
}

export default NavbarComponent;