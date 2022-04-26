
import React, { useState } from "react";
import styled from 'styled-components'
import { ToggleButtonGroup, ButtonGroup, ToggleButton, Button, Modal } from 'react-bootstrap';
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




const Filtro = ({refrescarExp, handleFiltro, handleCargar}) => {

   const [modalShow, setModalShow] = useState(false);
   const [radioTemaValue, setRadioTemaValue] = useState('TODOS')
   const [radioAutorValue, setRadioAutorValue] = useState('MIAS')
   const radioTema = [
     { name: 'TODOS', value: 'Todos' },
     { name: 'SECUENCIAL', value: 'Secuencias' },
     { name: 'MODULARIDAD', value: 'Modularidad' },
     { name: 'ALTERNATIVAS', value: 'Altenativas' },
     { name: 'REPETITIVAS', value: 'Repetitivas' }
   ];
   const radioAutor = [
     { name: 'MIAS', value: 'MIAS' },
     { name: 'TODAS', value: 'TODAS' },
   ];


   const handleChangeTema = (valTema) => {
     setRadioTemaValue(valTema)
     //const filtro= {tema:valTema, autor: radioAutorValue}
     const filtro= {tema:valTema}
     handleFiltro(filtro)
  }

  const handleChangeAutor = (valAutor) => {
    setRadioAutorValue(valAutor)
    //const filtro= {tema:radioTemaValue, autor: valAutor}
    const filtro= {tema:radioTemaValue}
    handleFiltro(filtro)
 }

   const refrescar = () => {
     setModalShow(false)
     refrescarExp()
   }

   return (
            <div>
            <Container>
                <Nav>
                     <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                        <ButtonGroup >
                            <Button className="btn btn-warning" onClick={() => setModalShow(true)}>
                              <i className="bi bi-plus"></i>
                            </Button>
                            <Button className="btn btn-warning" onClick={() => handleCargar()}>
                              <i className="bi bi-arrow-repeat"></i>
                            </Button>
                          </ButtonGroup >
                        </a>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <ButtonGroup >
                              {radioTema.map((radio, id) => (
                                <ToggleButton
                                  key={id}
                                  id={`radio-${id}`}
                                  type="radio"
                                  variant="warning"
                                  name="radio"
                                  value={radio.value}
                                  checked={radioTemaValue === radio.value}
                                  onChange={(ex) => handleChangeTema(ex.currentTarget.value)}
                                >
                                  {radio.name}
                                </ToggleButton>
                              ))}
                            </ButtonGroup>
                            <li className="nav-item">
                                      <a className="nav-link active" aria-current="page" href="#"></a>
                            </li>
                            <ButtonGroup >
                              {radioAutor.map((radiox, idx) => (
                                <ToggleButton
                                  key={idx}
                                  id={`radioAutor-${idx}`}
                                  type="radio"
                                  variant="warning"
                                  name="radioAutor"
                                  value={radiox.value}
                                  checked={radioAutorValue === radiox.value}
                                  onChange={(e) => handleChangeAutor(e.currentTarget.value)}
                                >
                                  {radiox.name}
                                </ToggleButton>
                              ))}
                            </ButtonGroup>
                            <li className="nav-item">
                                      <a className="nav-link active" aria-current="page" href="#"></a>
                            </li>
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
            <ModalExperiencia show={modalShow} onHide={refrescar}/>
            </div>

            )
}

export default Filtro
