import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import LogoC4 from './LogoC4'
import AuthService from "../services/auth.service";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import logo from '../img/PASAYOTEXTO_white.png'
import { Link } from 'react-router-dom'
import { createContext, useContext, useMemo } from "react";
import  UserProvider  from './UserProvider';
import  UserContext  from './UserContext';

const Container = styled.div.attrs({
    className: 'container',
})``






const NavBara = ({currentUser, setCurrentUser}) => {
  
    const user = currentUser

    function logOut() {
     AuthService.logout();
     setCurrentUser(undefined)
   }
        return (
<div>
          <Navbar  bg="warning"  expand="lg">
            <Container>
              <Navbar.Brand>
                <img
                    src={logo}
                    width="20%"
                    height="20%"
                    className="d-inline-block align-top"
                    alt="PASAYOTEXTO LOGO"
                    background-color= "#EEEEEE"
                  />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                         <Link to="/ejemplos" className="nav-link"><b>ACTIVIDADES </b></Link>
                         <Link to="/comunidad" className="nav-link"><b>EXPERIENCIAS</b></Link>
                         {currentUser &&
                           <Link onClick={logOut} to="/login" className="nav-link">
                             <b>
                               <Badge bg="danger">{currentUser}</Badge>
                             </b>
                           </Link>}
                         {!currentUser && <Link to="/login" className="nav-link"><b>ENTRAR</b></Link>}
                      </Nav>
              </Navbar.Collapse>

              <Nav className="me-auto">
              </Nav>


            </Container>
    </Navbar>
<br/>
</div>


            )
}

export default NavBara
