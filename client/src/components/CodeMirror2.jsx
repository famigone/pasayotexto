import React, { useState, useEffect } from "react";
import {ButtonGroup, Alert, Badge, ListGroup, Button, Modal, Table } from 'react-bootstrap';
import LogoPasayo from './LogoPasayo'
//import ModalError from './ModalError'
//import Codemirror from 'react-codemirror';
//import 'codemirror/lib/codemirror.css';
//import 'codemirror/theme/monokai.css';
//import 'codemirror/mode/javascript/javascript.js'
import {Controlled as CodeMirror} from 'react-codemirror2';
import axios from 'axios'
import api from '../api'
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');




const io = require('socket.io-client')



const ENDPOINT= "http://localhost:3333"
//DESCOMENTAR EN PROD
//const ENDPOINT= "https://pasayotextoback.fi.uncoma.edu.ar"
let socket;

const CodeMirror2 = ({...props}) => {
//  console.log("pinche plantilla " + props.plantilla )
  const [codigo, setCodigo] = useState(props.plantilla);
  const [modalerror, setModalerror] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [mostrarBtnLink, setMostrarBtnLink] = useState(false);
  const [mostrarBtnPlay, setMostrarBtnPlay] = useState(false);
  const [mostrarBtnSave, setMostrarBtnSave] = useState(false);

  let arregloInicial = []
  if (props.useroriginal) arregloInicial = [props.user, props.useroriginal]
  else  arregloInicial = [props.user]
  const [subscriptores, setSubscriptores] = useState(arregloInicial);
//  const link= "https://pasayotexto.fi.uncoma.edu.ar/canal/"+props.experiencia+"/"+props.canal+"/"+props.user

  const link= "http://localhost:8000/canal/"+props.experiencia+"/"+props.canal+"/"+props.user

  const handleClose = () => setModalerror(false);
  const options = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'material',

    }

  useEffect(function() {
      socket = io(ENDPOINT , {withCredentials: true});
      //socket = io(ENDPOINT);
      let experiencia= props.experiencia
      let canal = props.canal
      let user = props.user
    //  console.log("va a hacer canalIn en client con "+user)
      socket.emit("canalIn", { experiencia, canal, user }, (error) => {
        if (error) {
          alert(error);
        }
      });


  }, [ENDPOINT, props.canal]);

  useEffect(function() {

      socket.on('codeoEmit', (payload) =>  {
      //  console.log("payload..."+payload)
        setCodigo(payload.newCode)
      })
      return () => {  socket.disconnect({user:props.user});}
  }, []);

  useEffect(function() {
      //aquí nos llega el usuario nuevo que se suscribió al canal
      //lo agregamos al array de subscriptores
      socket.on('nuevoSubcriptor', (payload) =>  {
        //console.log("payload..."+payload)
        setSubscriptores(current => [...current, payload]);
      })
      return () => {  socket.disconnect();}
  }, []);

  const updateCodeInState = (newText) => {
    setCodigo(prevText => newText)
    //console.log("conectando para actualizar..."+props.canal)
    socket.emit('canalIn', {experiencia: props.experiencia._id, canal: props.canal});
    //publicamos el evento
    socket.emit('codeoEvent', {
      canal: props.canal,
      newCode: newText
    })
    //socket.disconnect();
  }

  function handleSaveSolucion(event) {
        event.preventDefault();
        async function postExperiencia() {
          try {
            //const response = await post('/experiencia', experiencia);
            //console.log("iiiiiiiddddd ",props.experiencia)
            const response = await api.updateExperienciaById(props.experiencia._id, {'solucion': codigo})
            setMostrarBtnSave(true)
            setTimeout(apagar, 3000)
            console.log(response)

            //props.history.push(`/articles/${response.data._id}`);
          } catch(error) {
            console.log('error', error);
          }
        }
        postExperiencia();
      }





const manejadorPasayo = (error) => {
  let hint;
  switch (error) {
    case "Unexpected identifier" :
      hint = "Parece que hay un error de sintaxis en tu código. Verificá que no hayan declaraciones de variables mal definidas o asignaciones a variables mal escritas."
      break;
    default: hint=error;
  }
  return hint;
}

    const runCode = () => {
         //console.log(javascriptCode)
         // Generate JavaScript code and run it.

         try {
           eval(codigo);
           setMostrarBtnPlay(true)
           setTimeout(apagar, 2000)
           //setmsgEjecutado(false)
           //setTimeout(apagarMsg, 5000)
         } catch (e) {
           console.log("modalerror ",modalerror)
           console.log("msgError ",msgError)
           setMsgError(manejadorPasayo(e.message))
           setModalerror(true)
         }
       }



const runCopy = () => {
      navigator.clipboard.writeText(link)
      setMostrarBtnLink(true)
      setTimeout(apagar, 2000)
  }
//  const runCopySecret = () => {
//    navigator.clipboard.writeText(linkSecret)
//  }

const conectades=()=>{
  return(

  <ListGroup horizontal>
  {  subscriptores.map((unUser) => {
      return (
        <ListGroup.Item variant="warning">
          <Badge bg="danger">
            {unUser}
          </Badge>
        </ListGroup.Item>
      )
    })}

  </ListGroup>)
}


const ModalError = (mostrar, msg) => {

  const [show, setShow] = useState(mostrar);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (

        <Modal

          backdrop="static"
          size="sm-down"
          centered
          size="lg"
          show={modalerror}
          centered
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
                   <Button variant="secondary" onClick={()=>setModalerror(false)}>
                     Ok
                   </Button>

                 </Modal.Footer>
        </Modal>

    );
  }

const botonera = () => {
//  console.log("props.user "+props.user)
//  console.log("props.experiencia.user ",props.experiencia.user ) //undefined
  if (props.user !== props.experiencia.user)
    return botoneraSimple()
  else
    return botoneraOwner()
}

const botoneraSimple = () => {
  return (
    <div className="d-grid gap-3">
        <ButtonGroup>
          <Button className="btn btn-warning" onClick={props.onHide}>
            <i className="bi bi-dash-circle-fill"></i>
          </Button>
          <Button className="btn btn-warning" onClick={runCode}>
            <i className="bi bi-play-fill"></i>
          </Button>
          <Button className="btn btn-warning" onClick={runCopy} >
            <i className="bi bi-share-fill"></i>
          </Button>
        </ButtonGroup>
    </div>
  )
}
const botoneraOwner = () => {
  return (
    <div className="d-grid gap-4">
        <ButtonGroup>
          <Button className="btn btn-warning" onClick={props.onHide}>
            <i className="bi bi-dash-circle-fill"></i>
          </Button>
          <Button className="btn btn-warning" onClick={runCode}>
            <i className="bi bi-play-fill"></i>
          </Button>
          <Button className="btn btn-warning" onClick={runCopy} >
            <i className="bi bi-share-fill"></i>
          </Button>
          <Button className="btn btn-warning" onClick={handleSaveSolucion} >
            <i className="bi bi-save-fill"></i>
          </Button>
        </ButtonGroup>
    </div>
  )
}
const apagar = () => {

  setMostrarBtnLink(false);
  setMostrarBtnPlay(false);
  setMostrarBtnSave(false);


}

const msgCopy = () => {
  return (

      <Alert key={"warning"} variant={"warning"} dismissible show={mostrarBtnLink}>
       <i class="bi bi-bookmark-plus-fill"></i> Tu link se copió en el portapapeles. Podes hacer Click derecho y seleccionar la opción PEGAR
     </Alert>
  )
}
const msgPlay = () => {
  return (

      <Alert key={"warning1"} variant={"warning"} dismissible show={mostrarBtnPlay}>
         <i class="bi bi-lightning-charge-fill"></i> Tu código fue ejecutado.
     </Alert>
  )
}
const msgSave = () => {
  return (

      <Alert key={"warning2"} variant={"warning"} dismissible show={mostrarBtnSave}>
       <i class="bi bi-box2-heart"></i> Tu código fue guardado como la solución oficial de este desafío PASAYO.
     </Alert>
  )
}



    return (
          <div>
            {msgSave()}
            {msgCopy()}
            {msgPlay()}
          <hr/>
          <CodeMirror
            value={codigo}
            options={options}
            onBeforeChange={(editor, data, code) => {
                  setCodigo(code);
                  updateCodeInState(code);
            }}
          />
          <ModalError show={modalerror} msg={msgError}/>

          {botonera()}
          <br/>
          {conectades()}

      </div>
    )

}

export default CodeMirror2
