import React, { useState, useEffect } from "react";
import {OverlayTrigger, Tooltip, ButtonGroup, Alert, Badge, ListGroup, Button, Modal, Table } from 'react-bootstrap';
import LogoPasayo from './LogoPasayo'
import manejadorPasayo from './ManejadorErrores'
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
const { JSHINT } = require('jshint');



const io = require('socket.io-client')



//const ENDPOINT= "http://localhost:3333"
//DESCOMENTAR EN PROD
const ENDPOINT= "https://pasayotextoback.fi.uncoma.edu.ar"
let socket;

const CodeMirror2 = ({...props}) => {
//  console.log("pinche plantilla " + props.plantilla )
  const [codigo, setCodigo] = useState(props.plantilla);
  const [codesesionid, setCodesesionid] = useState();
  const [modalerror, setModalerror] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [msgErrorCrudo, setMsgErrorCrudo] = useState("");
  const [mostrarBtnLink, setMostrarBtnLink] = useState(false);
  const [mostrarBtnPlay, setMostrarBtnPlay] = useState(false);
  const [mostrarBtnSave, setMostrarBtnSave] = useState(false);
  const [mostrarBtnSaveSesion, setMostrarBtnSaveSesion] = useState(false);

  let arregloInicial = []
  if (props.useroriginal) arregloInicial = [props.user, props.useroriginal]
  else  arregloInicial = [props.user]
  const [subscriptores, setSubscriptores] = useState(arregloInicial);
  const link= "https://pasayotexto.fi.uncoma.edu.ar/canal/"+props.experiencia._id+"/"+props.canal+"/"+props.user

  //const link= "http://localhost:8000/canal/"+props.experiencia._id+"/"+props.canal+"/"+props.user

  const handleClose = () => setModalerror(false);
  const options = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'material',
    }


    const lintear = () => {
      var source = [
        'function goo() {}',
        'foo = 3;'
      ];
      var options = {
        undef: true
      };
      var predef = {
        foo: false
      };
      JSHINT(codigo, options, predef);
      console.log(JSHINT.data());
      alert(JSHINT.data().errors[0].raw)
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
      })
      return () => {
      //  console.log("va a emitir desconectameEste")
      //  socket.emit("desconectameEste", { canal, user })
        socket.disconnect()}
  },
  [ENDPOINT, props.canal]);

  useEffect(function() {

      socket.on('codeoEmit', (payload) =>  {
      //  console.log("payload..."+payload)
        setCodigo(payload.newCode)
      })
      let canal = props.canal
      let user = props.user
      return () => {
      //  console.log("va a emitir desconectameEste")
      //  socket.emit("desconectameEste", { canal, user })
        socket.disconnect()}
  }, []);

  useEffect(function() {
      //aquí nos llega el usuario nuevo que se suscribió al canal
      //lo agregamos al array de subscriptores
      socket.on('nuevoSubcriptor', (payload) =>  {
        //console.log("payload..."+payload)
        setSubscriptores(current => [...current, payload]);
      })

  }, []);

  useEffect(function() {
      //aquí nos llega el usuario que se desconectó
      //lo quitamos del array de subscriptores
      socket.on('desconectarSubcriptor', (user) =>  {
        //console.log("payload..."+payload)
        const nuevoSub = subscriptores.filter((item) => item !== user)
        setSubscriptores(current => [...current, nuevoSub]);
      })
  }, []);

  const getCodesesion = async() => {
    try {
  //    console.log("entro con ", props.user +" - "+ props.experiencia._id)
      //si entró por link, debo buscar el codesesion del que comparte (ni el actual ni el que creó la experiencia)
      let elUser = props.user;
      let experienciaid= props.experiencia._id
      //este el que comparte
      //console.log("props.useroriginal",props.useroriginal )
      //este es el que habre el link
      //console.log("props.user", props.user )
      console.log("elUser", elUser )
      console.log("experienciaid", experienciaid )
    //  console.log("props", props )
      if (!props.guardarSesion) {
        elUser = props.useroriginal
        experienciaid = props.experiencia
      }
      const filtro = {user: elUser, experienciaid: experienciaid}
      const response = await api.getCodesesionByUser(filtro)
      setCodesesionid(response.data.data._id)
      setCodigo(response.data.data.codigo)
    //  console.log("recuperó esto:", response.data.data.codigo);
    } catch(error) {
      console.log('error', error);
    }
  }

  useEffect(function() {
     //console.log("buscando sesion");
     getCodesesion();

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
            setTimeout(apagar, 5000)
            console.log(response)

            //props.history.push(`/articles/${response.data._id}`);
          } catch(error) {
            console.log('error', error);
          }
        }
        postExperiencia();
      }

      function handleSaveSesion(event) {
            event.preventDefault();

            async function postUpdateCodeSesion() {
              try {

                const response = await api.updateCodesesionById(codesesionid, {'codigo': codigo})
                console.log(response)

                //props.history.push(`/articles/${response.data._id}`);
              } catch(error) {
                console.log('error', error);
              }
            }

            async function postCreateCodeSesion() {
              try {
                const oneCodesesion = {user: props.user, experienciaid: props.experiencia._id, codigo:codigo}
                const response = await api.insertCodesesion(oneCodesesion)
              } catch(error) {
                console.log('error', error);
              }
            }

            if (codesesionid)
              //no existe => create
              postUpdateCodeSesion();
            else
              //el codesesion existe => solo update
              postCreateCodeSesion();

            setMostrarBtnSaveSesion(true)
            setTimeout(apagar, 5000)
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
    //       console.log("modalerror ",modalerror)
           //console.log("msgError ",msgError)
           console.log("message ",e.message)
           console.log("property ",e.property)
           setMsgError(manejadorPasayo(e))
           setModalerror(true)
           setMsgErrorCrudo(e.message)
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
          <Badge  bg="danger">
                   {msgErrorCrudo}
          </Badge>
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
  //console.log("guardarSesion: ",props.guardarSesion)
  if (props.user !== props.experiencia.user)
    return botoneraSimple()
  else
    return botoneraOwner()
}

const botoneraSimple = () => {
  return (
    <div className="d-grid gap-4">
        <ButtonGroup>
            {(props.guardarSesion) &&
          <OverlayTrigger
             key={'top7'}
             placement={'top'}
             overlay={
               <Tooltip id={"asd777fs"}>
                 <strong>Salir</strong>.
               </Tooltip>
             }
       >
          <Button className="btn btn-warning" onClick={props.onHide}>
            <i className="bi bi-dash-circle-fill"></i>
          </Button>
        </OverlayTrigger>}
        <Button className="btn btn-warning" onClick={lintear}>
            LINT
          </Button>
          <OverlayTrigger
             key={'top6'}
             placement={'top'}
             overlay={
               <Tooltip id={"asd6666fs"}>
                 <strong>Ejecutar tu código</strong>.
               </Tooltip>
             }
       >

          <Button className="btn btn-warning" onClick={runCode}>
            <i className="bi bi-play-fill"></i>
          </Button>
        </OverlayTrigger>
        {(props.guardarSesion) &&
        <OverlayTrigger
           key={'top5'}
           placement={'top'}
           overlay={
             <Tooltip id={"55"}>
               <strong>Compartir esta sesión</strong>.
             </Tooltip>
           }
     >
          <Button className="btn btn-warning" onClick={runCopy} >
            <i className="bi bi-share-fill"></i>
          </Button>
        </OverlayTrigger>}
        {(props.guardarSesion) &&
        <OverlayTrigger
           key={'top110'}
           placement={'top'}
           overlay={
             <Tooltip id={"1111"}>
               <strong>Guardar la sesión</strong>.
             </Tooltip>
           }
     >
        <Button className="btn btn-warning" onClick={handleSaveSesion} >
          <i class="bi bi-save-fill"></i>
        </Button>
      </OverlayTrigger>}
        </ButtonGroup>
    </div>
  )
}
const botoneraOwner = () => {
  return (
    <div className="d-grid gap-5">
        <ButtonGroup>
          <OverlayTrigger
             key={'top344'}
             placement={'top'}
             overlay={
               <Tooltip id={"4444"}>
                 <strong>Salir</strong>.
               </Tooltip>
             }
       >
          <Button className="btn btn-warning" onClick={props.onHide}>
            <i className="bi bi-dash-circle-fill"></i>
          </Button>
        </OverlayTrigger>
          <OverlayTrigger
             key={'top3'}
             placement={'top'}
             overlay={
               <Tooltip id={"asdfs333"}>
                 <strong>Ejecutar tu código</strong>.
               </Tooltip>
             }
       >
          <Button className="btn btn-warning" onClick={runCode}>
            <i className="bi bi-play-fill"></i>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
           key={'top22'}
           placement={'top'}
           overlay={
             <Tooltip id={"2222"}>
               <strong>Compartir esta sesión</strong>.
             </Tooltip>
           }
     >
          <Button className="btn btn-warning" onClick={runCopy} >
            <i className="bi bi-share-fill"></i>
          </Button>
        </OverlayTrigger>
        {(props.guardarSesion) &&
        <OverlayTrigger
           key={'top51222222'}
           placement={'top'}
           overlay={
             <Tooltip id={"51522"}>
               <strong>Guardar como solución</strong>.
             </Tooltip>
           }
     >
     <Button className="btn btn-warning" onClick={handleSaveSolucion } >
       <i class="bi bi-hand-thumbs-up"></i>
     </Button>
        </OverlayTrigger>}
        {(props.guardarSesion) &&
        <OverlayTrigger
           key={'top51222'}
           placement={'top'}
           overlay={
             <Tooltip id={"5522"}>
               <strong>Guardar esta sesión</strong>.
             </Tooltip>
           }
     >
     <Button className="btn btn-warning" onClick={handleSaveSesion} >
       <i class="bi bi-save-fill"></i>
     </Button>
        </OverlayTrigger>}

        </ButtonGroup>
    </div>
  )
}
const apagar = () => {

  setMostrarBtnLink(false);
  setMostrarBtnPlay(false);
  setMostrarBtnSave(false);
  setMostrarBtnSaveSesion(false);


}

const msgCopy = () => {
  return (

      <Alert key={"warning"} variant={"warning"} dismissible show={mostrarBtnLink}>
       <i className="bi bi-bookmark-plus-fill"></i> Tu link se copió en el portapapeles. Podes hacer Click derecho y seleccionar la opción PEGAR
     </Alert>
  )
}
const msgPlay = () => {
  return (

      <Alert key={"warning1"} variant={"warning"} dismissible show={mostrarBtnPlay}>
         <i className="bi bi-lightning-charge-fill"></i> Tu código fue ejecutado.
     </Alert>
  )
}
const msgSave = () => {
  return (

      <Alert key={"warning2"} variant={"warning"} dismissible show={mostrarBtnSave}>
       <i className="bi bi-box2-heart"></i> Tu código fue guardado como la solución correcta de este desafío PASAYO.
     </Alert>
  )
}

const msgSaveSesion = () => {
  return (

      <Alert key={"warning21"} variant={"warning"} dismissible show={mostrarBtnSaveSesion}>
       <i className="bi bi-box2-heart"></i> Hemos guardado el código de tu sesión para que esté disponible la próxima vez que abras esta narrativa.
     </Alert>
  )
}


    return (
          <div>
            {msgSave()}
            {msgCopy()}
            {msgPlay()}
            {msgSaveSesion()}
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