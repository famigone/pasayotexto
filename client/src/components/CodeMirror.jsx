
import React, { useState, useEffect } from "react";
import {ButtonGroup, Button, Modal, Table } from 'react-bootstrap';
import Codemirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript.js'
const io = require('socket.io-client')
const socket = io("https://pasayotexto.fi.uncoma.edu.ar:8000")

const CodeMirror = ({...props}) => {
  const [code, setCode] = useState('');
  const link= "https://pasayotexto.fi.uncoma.edu.ar:8000/canal/"+props.experiencia+"/"+props.canal

  const options = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'monokai',

    }

  useEffect(function() {
      console.log("conectando..."+props.canal)
      socket.emit('canalIn', {experiencia: props.experiencia._id, canal: props.canal});
      socket.on('codeoEmit', (payload) =>  {
        updateCodeFromSockets(payload)})
      return () => {
        socket.disconnect();
      }
  }, []);


  const updateCodeFromSockets = (payload) => {
    console.log("recibi  update "+payload.newCode)
    //este set code no actualiza el componente
    setCode(payload.newCode)
  }




  const updateCodeInState = (newText) => {
    setCode(newText)
    console.log("conectando para actualizar..."+props.canal)
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
           eval(code);
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

        <Codemirror
          value={code}
          autoFocus= {true}
          onChange={updateCodeInState}
          options={options} />
        <hr/>
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
            <Button className="btn btn-warning" >
              {code}
            </Button>
          </ButtonGroup>
      </div>
    )

}

export default CodeMirror
