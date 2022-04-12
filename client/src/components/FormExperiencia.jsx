import React, { useState } from "react";
import {Span, ButtonGroup,Container, Button, Form, Dropdown } from 'react-bootstrap';
import { post } from 'axios';
import api from '../api'



function FormExperiencia(props) {

  const initialState = { titulo: '',
                         narrativa: '',
                         objetivo:'',
                         tema: '',
                         activo:1
                      }
  const [experiencia, setExperiencia] = useState(initialState)


function handleChange(event) {
    setExperiencia({...experiencia, [event.target.name]: event.target.value})

}

const handleSubmitDEPRECATED   = async () => {
        const payload = experiencia
        await api.insertExperiencia(payload).then(res => {
            console.log(res)
            setExperiencia(initialState)
        })
    }

function handleSubmit(event) {
      //event.preventDefault();
      async function postExperiencia() {
        try {
          //const response = await post('/experiencia', experiencia);
          const response = await api.insertExperiencia(experiencia)
          console.log(response)
          props.onHide()
          //props.history.push(`/articles/${response.data._id}`);
        } catch(error) {
          console.log('error', error);
        }
      }
      postExperiencia();
    }





  return (
<Container>
<Form >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Ingresá un Título</Form.Label>
    <Form.Control name="titulo"
                  placeholder="Título"
                  value={experiencia.titulo}
                  onChange={handleChange}/>
    <Form.Text className="text-muted">
      Una frase corta y clara para identificar la experiencia.
    </Form.Text>
    <br/><br/>
    <Form.Label>Narrativa</Form.Label>
    <Form.Control as="textarea"
                  name="narrativa"
                  rows={3}
                  placeholder="Ingresa una narrativa para esta experiencia"
                  value={experiencia.narrativa}
                  onChange={handleChange}
                  />
    <Form.Text className="text-muted">
      La narrativa es el marco de sentido para la experiencia. Trata de que sea un relato breve, claro y simple.
    </Form.Text>
    <br/><br/>
    <Form.Label>Objetivo didáctico</Form.Label>
    <Form.Control as="textarea"
                  name="objetivo"
                  rows={2}
                  placeholder="Ingresá un Objetivo didáctico"
                  value={experiencia.objetivo}
                  onChange={handleChange}
                  />
    <Form.Text className="text-muted">
       ¿Cuál aspecto disciplinar se espera que sea abordado desde esta experiencia?
    </Form.Text>
    <br/><br/>
    <Form.Select aria-label="Indicá el tema de tu experiencia"
              name="tema"
              onChange={handleChange}
              value={experiencia.tema}
    >
        <option>Indicá el tema de tu experiencia</option>
        <option value = "Secuencias"> Secuencias </option>
        <option value = "Modularidad"> Modularidad </option>
        <option value = "Alternativas"> Alternativas </option>
        <option value = "Repetitivas"> Repetitivas </option>
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


export default FormExperiencia;
