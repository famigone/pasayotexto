import React, { useState, useEffect } from "react";
import {ButtonGroup, Button, Modal, Table } from 'react-bootstrap';
import FormExperiencia from './FormExperiencia'
import LogoPasayo from './LogoPasayo'
import TablaExp from './TablaExp'
import CodeMirror from './CodeMirror'
import { useParams } from 'react-router';
import api from '../api'


const CanalIDE = (props) => {
    const { id, canal } = useParams();
    const [exp, setExp] = useState()
    const getExperiencia = async() => {
      try {
      // const response = await get("/api/experiencias", {params:filtro});
        const response = await api.getExperienciaById(id)
        setExp(response.data.data);
        //console.log(experiencias);
      } catch(error) {
        console.log('error', error);
      }
    }

    useEffect(function() {
       getExperiencia();
     }, []);



    return (
      <>
        <Modal
          {...props}
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



          </Modal.Body>

        </Modal>
      </>
    );
  }

export default CanalIDE
