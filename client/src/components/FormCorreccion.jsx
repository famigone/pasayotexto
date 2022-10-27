import React, { useState } from "react";
import {Span, ButtonGroup,Container, Button, Form, Dropdown } from 'react-bootstrap';
import { post } from 'axios';
import api from '../api'



function FormCorreccion(props) {

  const initialState = { titulo: '',
                         narrativa: '',
                         objetivo:'',
                         tema: '',
                         activo:1,                  
                         user: props.user
                      }
  const [trayecto, setTrayecto] = useState(initialState)


function handleChange(event) {
    setTrayecto({...trayecto, [event.target.name]: event.target.value})

}


function handleSubmit(event) {
      //event.preventDefault();
      async function postTrayecto() {
        try {
          //const response = await post('/trayecto', trayecto);
          const response = await api.insertTrayecto(trayecto)
          console.log(response)
          props.onHide()
          //props.history.push(`/articles/${response.data._id}`);
        } catch(error) {
          console.log('error', error);
        }
      }
      postTrayecto();
    }





  return (
<div className='border'>
  <br/>
<Container className="border-left">
<Form >
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Select aria-label="Indicá el tema de tu trayecto"
              name="tema"
              onChange={handleChange}
              value={trayecto.tema}
    > 
        <option>Seleccioná un estado</option>
        <option value = "SECUENCIAS"> Muy bien! Sin comentarios </option>
        <option value = "MODULARIDAD"> Con comentarios </option>        
    </Form.Select>
    <br/>
    
    <Form.Control as="textarea"
                  name="narrativa"
                  rows={12}
                  placeholder="Ingresa tus comentarios u observaciones"
                  value={trayecto.narrativa}
                  onChange={handleChange}
                  />
    <br/>
    
  </Form.Group>

<div className="d-flex justify-content-end">

  <Button variant="warning" onClick={handleSubmit}>
    Guardar
  </Button>
  

</div>
</Form>
</Container>
<br/>
</div>    
  );
}


export default FormCorreccion;
