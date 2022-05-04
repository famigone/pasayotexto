
import React, { useState, useEffect } from "react";
import {ButtonGroup, Button, Modal, Table } from 'react-bootstrap';
import Codemirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript.js'
const io = require('socket.io-client')
const socket = io()


const CodeMirror = ({...props}) => {
  const [code, setCode] = useState('alert("hola mundo")');
  const [link, setLink] = useState('');

  const options = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'monokai',

    }
    useEffect(function() {
      //un id random para identificar la sesión
      const random = Math.random().toString(36).slice(2);
      setLink("http://localhost:8000/canal/"+props.experiencia._id+"/"+random)
      //enviamos experiencia y random al server
      socket.emit('ide', {experiencia: props.experiencia, random: random});
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
              <i class="bi bi-dash-circle-fill"></i>
            </Button>
            <Button className="btn btn-warning" onClick={runCode}>
              <i class="bi bi-play-fill"></i>
            </Button>
          </ButtonGroup>
          <ButtonGroup>

            <Button className="btn btn-warning" onClick={runCopy} >
              <i class="bi bi-share"></i>
            </Button>
          </ButtonGroup>
      </div>
    )

}

export default CodeMirror
