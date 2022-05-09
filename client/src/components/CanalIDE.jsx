import React, { useState, useEffect } from "react";
import {ButtonGroup, Button, Modal, Table } from 'react-bootstrap';
import FormExperiencia from './FormExperiencia'
import LogoPasayo from './LogoPasayo'
import TablaExp from './TablaExp'
//import CodeMirror from './CodeMirror'
import CodeMirror2 from './CodeMirror2'
import { useParams } from 'react-router';
import api from '../api'



const CanalIDE = (props) => {
    const { id, canal } = useParams();
    const [exp, setExp] = useState("")

    const getExperiencia = async() => {
      try {
      // const response = await get("/api/experiencias", {params:filtro});
        const response = await api.getExperienciaById(id)
        setExp(response.data.data);
        //console.log(response.data.data);
      } catch(error) {
        console.log('error', error);
      }
    }

    useEffect(function() {
      // console.log(id);
       getExperiencia();

     }, []);


    return (

        <Modal

          backdrop="static"
          keyboard={false}
          size="sm-down"
          centered
          fullscreen={true}
          show={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>
                <LogoPasayo/>
                {exp.titulo}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TablaExp experiencia={exp}/>

            <CodeMirror2  experiencia={exp} canal={canal}/>

          </Modal.Body>

        </Modal>

    );
  }

export default CanalIDE
