
import React, { useState } from "react";
import styled from 'styled-components'
import { Form, ToggleButtonGroup, ButtonGroup, ToggleButton, Button, Modal } from 'react-bootstrap';
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




const Filtro = ({user, refrescarExp, handleFiltro, handleCargar}) => {

   const [modalShowNueva, setModalShowNueva] = useState(false);
   const [radioTemaValue, setRadioTemaValue] = useState()
   const [radioAutorValue, setRadioAutorValue] = useState()
   const [filtroTitulo, setFiltroTitulo] = useState("")
   const radioTema = [
     { name: 'TODOS', value: 'TODOS' },
     { name: 'SECUENCIAS', value: 'SECUENCIAS' },
     { name: 'MODULARIDAD', value: 'MODULARIDAD' },
     { name: 'ALTERNATIVAS', value: 'ALTERNATIVAS' },
     { name: 'REPETITIVAS', value: 'REPETITIVAS' }
   ];
   const radioAutor = [
     { name: 'MIAS', value: 'MIAS' },
     { name: 'TODAS', value: 'TODAS' },
   ];

const handleFiltroTitulo = (event) => setFiltroTitulo(event.target.value)
const handleShowNueva = (event) => {
    event.preventDefault()
    setModalShowNueva(true);

  }

   const refrescar = () => {
     let filtroFinal = {}
     if (radioTemaValue ) filtroFinal.tema = radioTemaValue
     if (radioAutorValue == 'MIAS') filtroFinal.user = user
     if (filtroTitulo) filtroFinal.titulo = filtroTitulo
     handleFiltro(filtroFinal)
   }
//console.log("fffff",radioTemaValue)
//console.log("xxxxx",radioAutorValue)
   return (
            <div>
            <Container>
                <Nav>
                     <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                        <ButtonGroup >
                            <Button className="btn btn-warning" onClick={handleShowNueva}>
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
                                  variant="outline-warning"
                                  name="radio"
                                  value={radio.value}
                                  checked={radioTemaValue == radio.value}
                                  onChange={(e) => setRadioTemaValue(e.currentTarget.value)}
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
                                    key={idx+10}
                                    id={`radio-${idx+10}`}
                                    type="radio"
                                    variant="outline-warning"
                                    name="radiox"
                                    value={radiox.value}
                                    checked={radioAutorValue === radiox.name}
                                    onChange={(e) => setRadioAutorValue(e.currentTarget.value)}
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
                             <input className="form-control me-2"
                                    type="search"
                                    placeholder="Título"
                                    aria-label="Search"
                                    value= {filtroTitulo}
                                    onChange = {handleFiltroTitulo}
                                    />
                              <button className="btn btn-warning" onClick={()=>refrescar()}>
                                <i className="bi bi-filter-circle-fill"></i>
                              </button>
                          </form>

                        </div>
                      </div>
                </Nav>

            </Container>
             <br/>
            <ModalExperiencia show={modalShowNueva} onHide={refrescar} user={user}/>
            </div>

            )
}

export default Filtro
