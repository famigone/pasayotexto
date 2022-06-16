import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import LogoC4 from './LogoC4'
import Links from './Links'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import logo from '../img/PASAYOTEXTO_white.png'

const Container = styled.div.attrs({
    className: 'container',
})``






const NavBara = ({username}) => {



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
                    <Links />
                </Nav>
              </Navbar.Collapse>
              <Nav className="me-auto">
                <i className="bi bi-file-person"></i>  {username}
              </Nav>
            </Container>

    </Navbar>
<br/>
</div>


            )
}

export default NavBara
