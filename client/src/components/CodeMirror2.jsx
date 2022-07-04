import React, { useState, useEffect } from "react";
import {ButtonGroup, Badge, ListGroup, Button, Modal, Table } from 'react-bootstrap';
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

  const [codigo, setCodigo] = useState('');
  let arregloInicial = []
  if (props.useroriginal) arregloInicial = [props.user, props.useroriginal]
  else  arregloInicial = [props.user]
  const [subscriptores, setSubscriptores] = useState(arregloInicial);
  //const link= "https://pasayotexto.fi.uncoma.edu.ar/canal/"+props.experiencia+"/"+props.canal

  const link= "http://localhost:8000/canal/"+props.experiencia+"/"+props.canal+"/"+props.user
  //const linkSecret= "http://localhost:8000/canalsecret/"+props.experiencia+"/"+props.canal
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
      console.log("va a hacer canalIn en client con "+user)
      socket.emit("canalIn", { experiencia, canal, user }, (error) => {
        if (error) {
          alert(error);
        }
      });


  }, [ENDPOINT, props.canal]);

  useEffect(function() {

      socket.on('codeoEmit', (payload) =>  {
        console.log("payload..."+payload)
        setCodigo(payload.newCode)
      })
      return () => {  socket.disconnect({user:props.user});}
  }, []);

  useEffect(function() {
      //aquí nos llega el usuario nuevo que se suscribió al canal
      //lo agregamos al array de subscriptores
      socket.on('nuevoSubcriptor', (payload) =>  {
        console.log("payload..."+payload)
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





    const runCode = () => {
         //console.log(javascriptCode)
         // Generate JavaScript code and run it.

         try {
           eval(codigo);
           //setmsgEjecutado(false)
           //setTimeout(apagarMsg, 5000)
         } catch (e) {
           alert(e);
         }
       }

    const runCopy = () => {
      navigator.clipboard.writeText(link)
  }
//  const runCopySecret = () => {
//    navigator.clipboard.writeText(linkSecret)
//  }
const listarSubscriptores = () => {
  subscriptores.map((unUser) => {
    return (
      <ListGroup.Item variant="secondary" key={unUser}>{unUser}</ListGroup.Item>
    )
  })
}

    return (
      <div>


        <hr/>
        <CodeMirror
          value={codigo}
          options={options}
          onBeforeChange={(editor, data, code) => {
                setCodigo(code);
                updateCodeInState(code);
          }}

        />

      <div className="d-grid gap-4">
          <ButtonGroup>
            <Button className="btn btn-warning" onClick={props.onHide}>
              <i className="bi bi-dash-circle-fill"></i>
            </Button>
            <Button className="btn btn-warning" onClick={runCode}>
              <i className="bi bi-play-fill"></i>
            </Button>
            <Button className="btn btn-warning" onClick={runCopy} >
              <i className="bi bi-share"></i>
            </Button>

          </ButtonGroup>
      </div>
          <ListGroup horizontal>
          {  subscriptores.map((unUser) => {
              return (
                <ListGroup.Item variant="warning"><Badge bg="danger">{unUser}</Badge></ListGroup.Item>
              )
            })}

          </ListGroup>

      </div>
    )

}

export default CodeMirror2
