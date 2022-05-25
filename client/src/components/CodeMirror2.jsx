import React, { useState, useEffect } from "react";
import {ButtonGroup, Button, Modal, Table } from 'react-bootstrap';
//import Codemirror from 'react-codemirror';
//import 'codemirror/lib/codemirror.css';
//import 'codemirror/theme/monokai.css';
//import 'codemirror/mode/javascript/javascript.js'
import {Controlled as CodeMirror} from 'react-codemirror2';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');




const io = require('socket.io-client')



//const ENDPOINT= "http://localhost:8000"
const ENDPOINT= "https://pasayotextoback.fi.uncoma.edu.ar"
let socket;

const CodeMirror2 = ({...props}) => {
  const [codigo, setCodigo] = useState('');
  const link= "https://pasayotexto.fi.uncoma.edu.ar/canal/"+props.experiencia+"/"+props.canal
  //const link= "https://pasayotexto.fi.uncoma.edu.ar/canal/"+props.experiencia+"/"+props.canal

  const options = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'material',

    }

  useEffect(function() {
      socket = io(ENDPOINT , {
        withCredentials: true,
})    ;
      socket.emit('canalIn',
                  {experiencia: props.experiencia._id, canal: props.canal},
                  (error) => {
                      if (error) {
                        alert(error);
                      }
      });

  }, [ENDPOINT, props.canal]);

  useEffect(function() {
    //  console.log("conectando..."+props.canal)
      socket.on('codeoEmit', (payload) =>  {
        setCodigo(payload.newCode)
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



    return (
      <div>


        <hr/>
        <CodeMirror
          value={codigo}
          options={options}
          onKeyPress={(editor, event) => {

            }
          }
          onBeforeChange={(editor, data, code) => {
                setCodigo(code);
          }}
          onChange={(editor, data, code) => {
            //console.log('controlled', code);
            updateCodeInState(code);
          }}
        />
          <ButtonGroup>
            <Button className="btn btn-warning" onClick={props.onHide}>
              <i className="bi bi-dash-circle-fill"></i>
            </Button>
            <Button className="btn btn-warning" onClick={runCode}>
              <i className="bi bi-play-fill"></i>
            </Button>
          </ButtonGroup>
          <ButtonGroup>

            <Button className="btn btn-warning" onClick={runCopy} >
              <i className="bi bi-share"></i>
            </Button>

          </ButtonGroup>
      </div>
    )

}

export default CodeMirror2
