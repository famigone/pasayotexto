import React, { useState } from "react";
import {Container, Button, Form, Dropdown } from 'react-bootstrap';




const FormExperiencia = (props) => {  


  return (
<Container>    
<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Ingresá un Título</Form.Label>
    <Form.Control placeholder="Título" />
    <Form.Text className="text-muted">
      Una frase corta y clara para identificar la experiencia.
    </Form.Text>
    <br/><br/>
    <Form.Label>Narrativa</Form.Label>
    <Form.Control as="textarea" rows={3} placeholder="Ingresa una narrativa para esta experiencia" />    
    <Form.Text className="text-muted">
      La narrativa es el marco de sentido para la experiencia. Trata de que sea un relato breve, claro y simple.
    </Form.Text>
    <br/><br/>
    <Form.Label>Objetivo didáctico</Form.Label>
    <Form.Control as="textarea" rows={2} placeholder="Ingresá un Objetivo didáctico" />
    <Form.Text className="text-muted">
       ¿Cuál aspecto disciplinar se espera que sea abordado desde esta experiencia?
    </Form.Text>    
    <br/><br/>
    <Form.Select aria-label="Indicá el tema de tu experiencia">
        <option>Indicá el tema de tu experiencia</option>
        <option value = "Secuencias"> Secuencias </option>
        <option value = "Modularidad"> Modularidad </option>
        <option value = "Alternativas"> Alternativas </option>
        <option value = "Repetitivas"> Repetitivas </option>
    </Form.Select>
  </Form.Group>


  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Container>
  );
}


export default FormExperiencia;

