
import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'

const Container = styled.div.attrs({
    className: 'container',
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-light',
})`
     position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;  
    background-color: #EEEEEE 
`



const NavBar = () => {

    
        return (
            <div>
            <Container>
                <Nav>                 
                    <Logo />
                    <Links />                                     
                </Nav>

            </Container>
             <br/><br/><br/><br/>   
            
            </div>
            )
}

export default NavBar