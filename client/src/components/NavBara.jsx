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
                    width="15%"
                    height="15%"
                    className="d-inline-block align-top"
                    alt="PASAYOTEXTO LOGO"
                    background-color= "#EEEEEE"
                  />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                      
                         
                         {currentUser &&
                           <Link onClick={logOut} to="/login" className="nav-link">
                             <h5>                              
                               <Badge bg="danger"><i class="bi bi-person-workspace"></i> {currentUser}</Badge>
                             </h5>
                           </Link>}
                         {!currentUser && <Link to="/login" className="nav-link"><b>ENTRAR</b></Link>}
                      </Nav>
              </Navbar.Collapse>

              <Nav className="me-auto">
              </Nav>


            </Container>
    </Navbar>

</div>


            )
}

export default NavBara
