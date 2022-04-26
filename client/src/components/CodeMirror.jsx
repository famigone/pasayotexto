import React, { useState, useEffect } from "react";
import {ButtonGroup, Button, Modal, Table } from 'react-bootstrap';
import Codemirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript.js'
const io = require('socket.io-client')
const socket = io()


const CodeMirror = (...props) => {
  const [code, setCode] = useState('alert("hola mundo")');
  const options = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'monokai',

    }
    useEffect(function() {
      socket.emit('ide', {experiencia: props.experiencia});
       //console.log("limite ",limite)
     }, [code]);


  const updateCodeInState = (newText) => setCode(newText)


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
              <i class="bi bi-dash-circle-fill"></i>
            </Button>
            <Button className="btn btn-warning" onClick={runCode}>
              <i class="bi bi-play-fill"></i>
            </Button>
          </ButtonGroup>
      </div>
    )

}

export default CodeMirror
