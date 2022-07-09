import React, { useState, useEffect } from "react";
import {ButtonGroup, Button, Modal, Table } from 'react-bootstrap';
import FormExperiencia from './FormExperiencia'
import LogoPasayo from './LogoPasayo'
import TablaExp from './TablaExp'
//import CodeMirror from './CodeMirror'
import { useParams } from 'react-router';
import api from '../api'
import { createContext, useContext, useMemo } from "react";
import  UserProvider  from '../components/UserProvider';
import  UserContext  from '../components/UserContext';
import {Controlled as CodeMirror} from 'react-codemirror2';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

const ModalSolucion = (props) => {

    const [mostrar, setMostrar] = useState();
    const [codigo, setCodigo] = useState(props.plantilla);
    const  { user }  = useContext(UserContext);

    const options = {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'material',

      }

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
                {props.experiencia.titulo}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TablaExp experiencia={props.experiencia}/>
              <CodeMirror
                value={props.experiencia.solucion}
                options={options}
                onBeforeChange={(editor, data, code) => {
                      setCodigo(code);
                }}
              />
          </Modal.Body>
        </Modal>
    );
  }

export default ModalSolucion
