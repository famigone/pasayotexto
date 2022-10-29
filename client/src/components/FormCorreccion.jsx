import React, { useState } from "react";
import {Alert, Span, ButtonGroup,Container, Button, Form, Dropdown } from 'react-bootstrap';
import { post } from 'axios';
import api from '../api'



function FormCorreccion({codesesion, 
                        actualizarSesion, 
                        observacionInicial,
                        estadoObservacionInicial
 }) {

  const initialState = { _id: codesesion._id, 
                        estadoObservacion:estadoObservacionInicial,
                         observacion: observacionInicial ,                         
                      }
  const [observacion, setObservacion] = useState(initialState)
  const [exito, setExito] = useState(false)

function handleChange(event) {
    setObservacion({...observacion, [event.target.name]: event.target.value})
    

}

const apagar = () => {

  setExito(false);
  
}


function handleSubmit(event) {
      //event.preventDefault();
      async function updateObservaciones() {
        try {
          //const response = await post('/trayecto', trayecto);
          setExito(true)  
          const response = await api.updateCodesesionObservacion(observacion)
          actualizarSesion(observacion)
        setTimeout(apagar, 3000)
        
          
          
        } catch(error) {
          console.log('error', error);
        }
      }
      updateObservaciones();
    }




//console.log(codesesion)
  return (
<div >
  
<Container className="border-left">
<Form >
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Select aria-label="Indicá el tema de tu trayecto"
              name="estadoObservacion"
              onChange={handleChange}
              value={observacion.estadoObservacion}
    > 
        <option>Seleccioná un estado</option>
        <option value = "Muy Bien!"> Muy bien! </option>
        <option value = "Con comentarios"> Con comentarios </option>        
    </Form.Select>
    <br/>
    
    <Form.Control as="textarea"
                  style={{"background-color":"#F2F2F2"}}
                  name="observacion"
                  rows={16}
                  placeholder="Ingresa tus comentarios u observaciones"
                  value={observacion.observacion}
                  onChange={handleChange}
                  />
    <div className="d-grid gap-1">
  <Button variant="warning" onClick={handleSubmit}>
  <i class="bi bi-save2-fill"></i> Guardar observación
  </Button>
  <Alert key={"warning21"} variant={"warning"} dismissible show={exito}>
       <i className="bi bi-box2-heart"></i> Hemos guardado tus correcciones.
  </Alert>
</div>  
  </Form.Group>





</Form>
</Container>
<br/>
</div>    
  );
}


export default FormCorreccion;
