
import React, { useState } from "react";
import styled from 'styled-components'
import { Button, Modal } from 'react-bootstrap';
import ModalExperiencia from './ModalExperiencia'
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
  
   const [modalShow, setModalShow] = useState(false);
    
        return (
            <div>
            <Container>
                <Nav>                 
                     <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            
                            <Button className="btn btn-warning" onClick={() => setModalShow(true)}>
                                <i className="bi bi-plus"></i>
                            </Button>
                        </a>                     
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            
                           <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                              <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off"/>
                              <label className="btn btn-outline-warning" forhtml="btnradio1">Secuencias</label>

                              <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off"/>
                              <label className="btn btn-outline-warning" forhtml="btnradio2">Alternativas</label>

                              <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off"/>
                              <label className="btn btn-outline-warning" forhtml="btnradio3">Repetitivas</label>

                              
                            </div>
                            <li className="nav-item">
                                      <a className="nav-link active" aria-current="page" href="#"></a>
                            </li>
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                              <input type="radio" className="btn-check" name="btnMiasTodas" id="btnradioMias" autoComplete="off"/>
                              <label className="btn btn-outline-warning" forhtml="btnradioMias">Solo mías</label>

                              <input type="radio" className="btn-check" name="btnMiasTodas" id="btnradioTodas" autoComplete="off"/>
                              <label className="btn btn-outline-warning" forhtml="btnradioTodas">Todas</label>  
                            </div>

                          </ul>
                           <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Tópico" aria-label="Search"/>
                            <button className="btn btn-outline-warning" type="submit">Filtrar</button>
                          </form>

                        </div>
                      </div>
                </Nav>  

            </Container>    
             <br/>  
            <ModalExperiencia show={modalShow} onHide={() => setModalShow(false)}/> 
            </div>

            )
}

export default Filtro