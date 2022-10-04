
import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { Form, ToggleButtonGroup, ButtonGroup, ToggleButton, Button, Modal } from 'react-bootstrap';
import ModalExperiencia from './ModalExperiencia'
import Logo from './Logo'
import Links from './Links'
import Select from 'react-select'
import api from '../api'
import ModalSelectTrayecto from "./ModalSelectTrayecto";

const Container = styled.div.attrs({
    className: 'container',
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-light',
})`
   background-color: #eeeeee
`




const Filtro = ({user, refrescarExp, handleFiltro, handleCargar, filtro}) => {

   const [modalShowNueva, setModalShowNueva] = useState(false);
   const [modalTrayecto, setModalTrayecto] = useState(false);
   const [botonTrayecto, setBotonTrayecto] = useState("btn btn-outline-warning");   
   const [radioTemaValue, setRadioTemaValue] = useState(filtro.tema)
   const [radioAutorValue, setRadioAutorValue] = useState(filtro.autor)
   const [filtroTitulo, setFiltroTitulo] = useState(filtro.titulo)
   const [options, setOptions] = useState([""]);
   const [trayectoid, setTrayectoid] = useState([""]);
   const [filtoTrayecto, setFiltoTrayecto] = useState([""]);
   const [temaDisabled, setTemaDisabled] = useState(false);
   const [autorDisabled, setAutorDisabled] = useState(false);
   
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

  const aplicarFiltroTrayecto = (trayectoIdx) => {
    setModalTrayecto(false)
    setAutorDisabled(true)
    setTemaDisabled(true)
    console.log("adentro con: "+trayectoIdx)
    setFiltoTrayecto(trayectoIdx)
    setBotonTrayecto("btn btn-warning")
  }

  const limpiarx = () => {
    setAutorDisabled(false)
    setTemaDisabled(false)
    setBotonTrayecto("btn btn-outline-warning")
    console.log("limpiooo")
    setModalTrayecto(false)
    setFiltoTrayecto("")
    
  }
  
   const refrescar = () => {
     
     let filtroFinal = {}
     if (radioTemaValue ) {
          filtroFinal.tema = radioTemaValue          
        }
     if (radioAutorValue == 'MIAS') {
          filtroFinal.user = user
          filtroFinal.autor = "MIAS"
      }else{filtroFinal.autor = "TODAS"}
     if (filtroTitulo) {
          filtroFinal.titulo = filtroTitulo          
        }
     handleFiltro(filtroFinal)
   }

   useEffect(() => {
    const getData = async () => {
      
      const arr = [];
      const response = await api.getAllTrayectos(filtoTrayecto)
  //    console.log("response.data.data "+response.data.data[0].titulo)
      let result = response.data.data.map((trayecto) => {
        return arr.push({value: trayecto._id, label: trayecto.titulo});
      });
      setOptions(arr);
    };
    getData();
  }, []);

  const handleSelect = value => setTrayectoid(value)
  
//console.log("fffff",radioTemaValue)
//console.log("xxxxx",radioAutorValue)
   return (
            <div>
            

            
                <Nav>
                     <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                        
                        <ButtonGroup >
                            <Button className="btn btn-warning" onClick={handleShowNueva}>
                            <i className="bi bi-bookmark-plus-fill"></i> CREAR
                            </Button>
                            <Button className="btn btn-warning" onClick={() => handleCargar()}>
                              <i className="bi bi-arrow-repeat"></i> VER MÁS
                            </Button>
                            
                          </ButtonGroup >
                        </a>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <ButtonGroup >
                              {radioTema.map((radio, id) => (
                                <ToggleButton
                                  disabled = {temaDisabled}
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
                                    disabled ={autorDisabled}
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
                            <button className={botonTrayecto} onClick={()=>setModalTrayecto(true)}>
                          <i class="bi bi-filter"></i> Trayecto
                              </button>
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


             <br/>
             
            <ModalExperiencia 
                show={modalShowNueva} 
                onHide={refrescar} 
                user={user}/>

            <ModalSelectTrayecto 
                show={modalTrayecto} 
                seleccionar = {aplicarFiltroTrayecto} 
                limpiar = {limpiarx} 
                onHide={()=>setModalTrayecto(false)} 
                user={user}/>
            </div>

            )
}

export default Filtro

