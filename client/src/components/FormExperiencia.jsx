import React, { useState, useEffect } from "react";
import {Span,Row,Modal, Col, Alert, ButtonGroup,Container, Button, Form, Dropdown } from 'react-bootstrap';
import { post } from 'axios';
import api from '../api'
import ModalTrayecto from "./ModalTrayecto";
import AuthService from "../services/auth.service";
import Select from 'react-select'
import AsyncSelect from 'react-select/async';
import Async, { useAsync } from 'react-select/async';
function FormExperiencia(props) {

  const initialState = { titulo: '',
                         narrativa: '',
                         objetivo:'',
                         tema: '',
                         activo:1,
                         solucion: '//Parece que aún no se ha indicado la solución a esta narrativa',
                         user: props.user
                      }
  const [experiencia, setExperiencia] = useState(initialState)
  const [modalTrayecto, setModalTrayecto] = useState(false);
  const [user, setUser] = useState(AuthService.getCurrentUser().username)
  const [options, setOptions] = useState([""]);
  const [trayectoid, setTrayectoid] = useState([""]);
  const [filtoTrayecto, setFiltoTrayecto] = useState([""]);
function handleChange(event) {
    setExperiencia({...experiencia, [event.target.name]: event.target.value})

}


useEffect(() => {
  const getData = async () => {
    
    const arr = [];
    const response = await api.getAllTrayectos(filtoTrayecto)
//    console.log("response.data.data "+response.data.data[0].titulo)
    let result = response.data.data.map((trayecto) => {
      return arr.push({value: trayecto._id, label: trayecto.titulo});
    });
    setOptions(arr);
  };
  getData();
}, [modalTrayecto]);



const cerrar = () => {}

const handleSelect = value => setTrayectoid(value)

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
  <Form.Label>Si esta Experiencia pertenece a un Trayecto, por favor, seleccionalo</Form.Label>
   
     <Select
        
        name="trayectoid"
        className="input-cont"
        placeholder= "Seleccioná un trayecto"
        options={options}
        onInputChange={handleSelect}
      />                
    <br/>
    
    <Container>
      
          <Alert variant={"warning"} >
          
            <p><i className="bi bi-info-circle-fill"></i>  Los <b>Trayectos</b> agrupan Experiencias didácticamente relacionadas. Podes agrupar esta Experiencia en un <b>Trayecto</b> ya existente o bien podes crear uno nuevo.</p>
            <hr/>
            <Button variant="secondary"   size="sm" onClick={()=>setModalTrayecto(true)} >
            <i className="bi bi-cloud-plus-fill"></i> Crear Trayecto
          </Button>
          </Alert>
      
    </Container>
    
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
    <Form.Label>Plantilla</Form.Label>
    <Form.Control as="textarea"
                  name="plantilla"
                  rows={3}
                  placeholder="Ingresa una plantilla para esta experiencia"
                  value={experiencia.plantilla}
                  onChange={handleChange}
                  />
    <Form.Text className="text-muted">
      La plantilla debe tomar la forma de comentarios que estructuren la solución.
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
<ModalTrayecto show={modalTrayecto} onHide={()=>setModalTrayecto(false)} user={user}/>
</div>
</Form>
</Container>
  );
}


export default FormExperiencia;
