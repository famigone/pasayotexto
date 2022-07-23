import React, { useState, useEffect } from "react";
import {ButtonGroup, Button, Modal, Table } from 'react-bootstrap';
import FormExperiencia from './FormExperiencia'
import LogoPasayo from './LogoPasayo'
import TablaExp from './TablaExp'
//import CodeMirror from './CodeMirror'
import CodeMirror2 from './CodeMirror2'
import { useParams } from 'react-router';
import api from '../api'
import { createContext, useContext, useMemo } from "react";
import  UserProvider  from '../components/UserProvider';
import  UserContext  from '../components/UserContext';
import AuthService from "../services/auth.service";

const CanalIDE = (props) => {
    const { id, canal, useroriginal } = useParams();
    const [exp, setExp] = useState("")
    const user = AuthService.getCurrentUser().username;
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


    // console.log("la expe en canalIDE ",exp)
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

            <CodeMirror2
              experiencia={id}
              plantilla={exp.plantilla}
              canal={canal}
              useroriginal={useroriginal}
              user={user}
              guardarSesion = {false}

              />

          </Modal.Body>

        </Modal>

    );
  }

export default CanalIDE
