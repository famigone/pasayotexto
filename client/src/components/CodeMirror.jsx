
import React, { useState, useEffect } from "react";
import {ButtonGroup, Button, Modal, Table } from 'react-bootstrap';
import Codemirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript.js'


const CodeMirror = ({...props}) => {
  const [code, setCode] = useState('');
  const link= "http://localhost:8000/canal/"+props.experiencia+"/"+props.canal

  const options = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'monokai',

    }

  useEffect(function() {
      console.log("conectando..."+props.canal)
      props.socket.emit('canalIn', {experiencia: props.experiencia._id, canal: props.canal});
      props.socket.on('codeoEmit', (payload) =>  {
        console.log(payload)
        updateCodeFromSockets(payload)})
      return () => {
        props.socket.disconnect();
      }
  }, []);


  const updateCodeFromSockets = (payload) => {
    console.log("recibi alto update")
    setCode(payload.newCode)
  }




  const updateCodeInState = (newText) => {
    setCode(newText)
    console.log("conectando para actualizar..."+props.canal)
    props.socket.emit('canalIn', {experiencia: props.experiencia._id, canal: props.canal});
    //publicamos el evento
    props.socket.emit('codeoEvent', {
      canal: props.canal,
      newCode: newText
    })
    //props.socket.disconnect();
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
          </ButtonGroup>
      </div>
    )

}

export default CodeMirror
