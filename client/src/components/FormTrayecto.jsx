import React, { useState } from "react";
import {Span, ButtonGroup,Container, Button, Form, Dropdown } from 'react-bootstrap';
import { post } from 'axios';
import api from '../api'



function FormTrayecto(props) {

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

const handleSubmitDEPRECATED   = async () => {
        const payload = trayecto
        await api.insertTrayecto(payload).then(res => {
            console.log(res)
            setTrayecto(initialState)
        })
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
<Container>
<Form >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Ingresá un Título</Form.Label>
    <Form.Control name="titulo"
                  placeholder="Título"
                  value={trayecto.titulo}
                  onChange={handleChange}/>
    <Form.Text className="text-muted">
      Una frase corta y clara para identificar la trayecto.
    </Form.Text>
    <br/><br/>
    <Form.Label>Narrativa</Form.Label>
    <Form.Control as="textarea"
                  name="narrativa"
                  rows={3}
                  placeholder="Ingresa una narrativa para esta trayecto"
                  value={trayecto.narrativa}
                  onChange={handleChange}
                  />
    <Form.Text className="text-muted">
      La narrativa es el marco de sentido para la trayecto. Puede ser un relato o simplemente una descripción breve de las narrativas involucradas.
    </Form.Text>
    <br/><br/>
    
    <Form.Label>Objetivo didáctico</Form.Label>
    <Form.Control as="textarea"
                  name="objetivo"
                  rows={2}
                  placeholder="Ingresá un Objetivo didáctico"
                  value={trayecto.objetivo}
                  onChange={handleChange}
                  />
    <Form.Text className="text-muted">
       ¿Cuál aspecto disciplinar se espera que sea abordado desde esta trayecto?
    </Form.Text>
    <br/><br/>
    <Form.Select aria-label="Indicá el tema de tu trayecto"
              name="tema"
              onChange={handleChange}
              value={trayecto.tema}
    >
        <option>Indicá el tema de tu trayecto</option>
        <option value = "SECUENCIAS"> Secuencias </option>
        <option value = "MODULARIDAD"> Modularidad </option>
        <option value = "ALTERNATIVAS"> Alternativas </option>
        <option value = "REPETITIVAS"> Repetitivas </option>
    </Form.Select>
  </Form.Group>
<hr/>
<div className="d-flex justify-content-end">
<ButtonGroup aria-label="Basic example" >
  <Button variant="warning" onClick={handleSubmit}>
    Guardar
  </Button>
  <Button variant="secondary" onClick={props.onHide}>
    Mejor no
  </Button>
</ButtonGroup>
</div>
</Form>
</Container>
  );
}


export default FormTrayecto;
