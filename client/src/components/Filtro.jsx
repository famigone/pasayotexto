
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
   background-color: #eeeeee
`



const Filtro = () => {

    
        return (
            <div>
            <Container>
                <Nav>                 
                     <div className="container-fluid">
                        <a className="navbar-brand" href="#">Filtros</a>                     
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            
                           <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Tema
                              </a>
                              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">secuencias</a></li>
                                <li><a className="dropdown-item" href="#">alternativas</a></li>                                
                                <li><a className="dropdown-item" href="#">repetitivas</a></li>
                                <li><a className="dropdown-item" href="#">modularidad</a></li>
                              </ul>
                            </li>
   
                          </ul>
                           <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Tópico" aria-label="Search"/>
                            <button className="btn btn-outline-info" type="submit">Filtrar</button>
                          </form>
                        </div>
                      </div>
                </Nav>  

            </Container>    
             <br/>                    
            </div>

            )
}

export default Filtro