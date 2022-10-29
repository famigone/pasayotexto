import React, { useState, useEffect, useContext } from "react";
import Image from './Image'
import logo from '../img/PASAYOTEXTO_white.png'
import styled from 'styled-components'
import LogoPasayo from './LogoPasayo'
import TablaExp from './TablaExp'
import {Alert, Row, Col, ListGroup, Modal, ToggleButtonGroup, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import {Controlled as CodeMirror} from 'react-codemirror2';
import  UserContext  from '../components/UserContext';
import api from '../api'
import axios from 'axios'
import AuthService from "../services/auth.service";
import manejadorPasayo from './ManejadorErrores'
import FormCorreccion from './FormCorreccion'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');


const UnaCard = styled.div.attrs({
    className: 'card text-black mb-3',
})`
width: 18rem;
background-color:#EEEEEE
`

const UnBadge = styled.div.attrs({
    className: 'badge bg-danger',
})`


`
const UnBadgeSesion = styled.div.attrs({
  className: 'badge bg-secondary',
})`


`
const CardSesion = ({sesion, userId, onDelete, experiencia, handleClickExp, canal}) => {
  const [mostrar, setMostrar] = useState(false);
  const [codigo, setCodigo] = useState(experiencia.solucion);
  const [mostrarModalDelete, setMostrarModalDelete] = useState(false);
  const [trayecto, setTrayecto] = useState("-");
  const [modalerror, setModalerror] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [msgErrorCrudo, setMsgErrorCrudo] = useState("");
  const [mostrarBtnLink, setMostrarBtnLink] = useState(false);
  const [mostrarBtnPlay, setMostrarBtnPlay] = useState(false);
  const [mostrarBtnSave, setMostrarBtnSave] = useState(false);
  const [mostrarBtnSaveSesion, setMostrarBtnSaveSesion] = useState(false);
  const [observacion, setObservacion] = useState(sesion.observacion);
  const [estadoObservacion, setEstadoObservacion] = useState(sesion.estadoObservacion);

  const user = AuthService.getCurrentUser().username;
  

  const ModalError = (mostrar, msg) => {

    const [show, setShow] = useState(mostrar);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
      return (
  
          <Modal
  
            backdrop="static"          
            centered
            size="lg"
            show={modalerror}          
          >
            <Modal.Header closeButton>
              <Modal.Title>
                  <LogoPasayo/>
                  Ups!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {msgError}
            </Modal.Body>
            <Modal.Footer>
            <UnBadge  bg="danger">
                     {msgErrorCrudo}
            </UnBadge>
                     <Button variant="secondary" onClick={()=>setModalerror(false)}>
                       Ok
                     </Button>
  
                   </Modal.Footer>
          </Modal>
  
      );
    }

  const options = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'material',

    }
 



     const botonera = () => {
     //  console.log("props.user "+props.user)
    //  console.log("DUEÑEEEEE user ",user ) //undefined
    //  console.log("DUEÑEEEEE experiencia.user ", experiencia.user ) //undefined
       if ((user == experiencia.user) || (user == "PASAYO"))
       return botoneraSimple()
       else
         return botoneraSimple()
     }

     const botoneraSimple = () => {
       return (
         <div className="d-grid gap-1">
           <ButtonGroup >
             <Button className="btn btn-warning" onClick={() => setMostrar(true)}>
               <i className="bi bi-play-fill"></i>
             </Button>
             
           </ButtonGroup >
         </div>
       )
     }
     const runCode1 = () => {
          try {
            eval(sesion.codigo);
          } catch (e) {
            alert(e)
          }
        }

        const runCode = () => {
          //console.log(javascriptCode)
          // Generate JavaScript code and run it.
 
          try {
            eval(sesion.codigo);
            //setMostrarBtnPlay(true)
            //setTimeout(apagar, 2000)
            //setmsgEjecutado(false)
            //setTimeout(apagarMsg, 5000)
          } catch (e) {
            setMsgError(manejadorPasayo(e))
            setModalerror(true)
            setMsgErrorCrudo(e.message)
          }
        }

const formatear=(fecha) => {
  fecha = new Date(fecha).toLocaleDateString()
return(fecha)
}

const actualizarSesion=(sesionUpdate) => {
  //console.log("actualizo: "+sesionUpdate.observacion)
  setObservacion(sesionUpdate.observacion)
  setEstadoObservacion(sesionUpdate.estadoObservacion)
}



 //console.log("sesionó "+experiencia.titulo)

    return (
            <UnaCard >
              <Modal
                backdrop="static"
                keyboard={false}
                size="sm-down"
                centered
                fullscreen={true}
                show={mostrar}

              >
                <Modal.Header closeButton>
                  <Modal.Title>
                      <LogoPasayo/>
                      {experiencia.titulo}
                  </Modal.Title>
                </Modal.Header>                              
                <Modal.Body>
                <Row>                  
                <Col xs={8}>
                  <TablaExp experiencia={experiencia}/>
                    <CodeMirror
                      value={sesion.codigo}
                      options={options}
                      onBeforeChange={(editor, data, code) => {
                            setCodigo(code);
                      }}
                    />
                    <div className="d-grid gap-1">
                        <ButtonGroup>
                          <Button className="btn btn-warning" onClick={runCode}>
                            <i className="bi bi-play-fill"></i>
                          </Button>
                        </ButtonGroup>
                    </div>
                    </Col>
                    <Col >
                      <FormCorreccion 
                        codesesion={sesion}
                        actualizarSesion= {actualizarSesion}
                        observacionInicial= {observacion}
                        estadoObservacionInicial = {estadoObservacion}
                      />
                    </Col>
                    </Row>    
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="warning" onClick={()=>setMostrar(false)}>
                    Salir
                  </Button>
                </Modal.Footer>

              </Modal>
                  <div className="card-header"><b>{experiencia.titulo}</b></div>
                  
                  <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Fecha: </b><UnBadgeSesion> {formatear(sesion.updatedAt)}</UnBadgeSesion></li>
                        <li className="list-group-item"><b>Tema: </b> <UnBadgeSesion>{experiencia.tema}</UnBadgeSesion></li>                        
                        <li className="list-group-item"><b>Trayecto: </b>{trayecto}</li>
                  </ul>
                  
                  <ModalError show={modalerror} msg={msgError}/>
                  
                  {botonera()}




                   <div className="card-footer text-black ">

                     <div className="d-flex justify-content-end">
                        <UnBadge>Sesion: {userId} </UnBadge>
                        <UnBadgeSesion> {experiencia.user} </UnBadgeSesion>
                        
                     </div>
                   </div>
            </UnaCard>
        )}

export default CardSesion;
