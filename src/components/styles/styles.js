import styled from 'styled-components';

import computer from '../../img/computer2.jpg';

export const StyledWrap = styled.div`
.masthead {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 35rem;
  padding: 15rem 0;
  background: url(${computer});
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
}
.masthead h1 {
  font-size: 2.5rem;
  line-height: 2.5rem;
  background-color: #E3E2DF;
  
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
}
.masthead h2 {
  max-width: 20rem;
  font-size: 1rem;
  color: #EEE2DC;
}
@media (min-width: 768px) {
  .masthead h1 {
    font-size: 4rem;
    line-height: 4rem;
  }
}
@media (min-width: 992px) {
  .masthead {
    height: 100vh;
    padding: 0;
  }
  .masthead h1 {
    font-size: 6.5rem;
    line-height: 6.5rem;
  }
  .masthead h2 {
    max-width: 30rem;
    font-size: 1.25rem;
  }
}
`;

export const StyledNavbar = styled.div`

  a, .navbar-light .navbar-nav .nav-link {
    // color: #212529;
    color: #0177aa;
  }

  div a {
    font-size: 1.3rem;
  }

  .brand {
    font-size: 3rem;
  }
  border: 0;    
  box-shadow: none;
  .navbar.navbar-default {
    background-color: #99ccff;
    border: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .navbar.navbar-default .navbar-collapse {
    border: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;