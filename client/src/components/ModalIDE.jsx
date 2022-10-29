import React, { useState, useEffect } from "react";
import {Alert, Row, Col, ButtonGroup, Button, Modal, Table } from 'react-bootstrap';
import FormExperiencia from './FormExperiencia'
import LogoPasayo from './LogoPasayo'
import TablaExp from './TablaExp'
//import CodeMirror from './CodeMirror'
import CodeMirror2 from './CodeMirror2'
import AuthService from "../services/auth.service";
import api from '../api'

const ModalIDE = (props) => {
  const [codesesion, setCodesesion] = useState(undefined)


  useEffect(async() => {     
    const filtro = {user: props.user, experienciaid: props.experiencia._id}
    const response = await api.getCodeSesion(filtro);     
    console.log("codeSesion ",response.data.data.observacion)
    setCodesesion(response.data.data.observacion)
    
  }, []);

  const tablaConObservacion = () => {
    return (
      <Row>                  
          <Col xs={6}>
          <TablaExp experiencia={props.experiencia}/>
          </Col>
          <Col>
          <Alert  key={"dsf333"} variant={"warning"}>
          <b>Observaciones:</b> {codesesion}
        </Alert>
           
          </Col>
        </Row>  
    )
  }


  const tablaSola = () => {
    return (
          <TablaExp experiencia={props.experiencia}/>      
    )
  }

  const tabla = () => {
    if (codesesion) return tablaConObservacion()
    else return tablaSola()
  } 
  return (



      <Modal
        {...props}
        backdrop="static"
        keyboard={false}
        size="sm-down"
        centered
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
              <LogoPasayo/>
              {props.experiencia.titulo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          
         {tabla()}   
          <CodeMirror2 onHide={props.onHide}
                      experiencia={props.experiencia}
                      canal={props.canal}
                      user={props.user}
                      plantilla = {props.experiencia.plantilla}
                      guardarSesion ={true}
          />

        </Modal.Body>

      </Modal>

  );
}


export default ModalIDE;
