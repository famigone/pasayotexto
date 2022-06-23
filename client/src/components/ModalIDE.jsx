import React, { useState, useEffect } from "react";
import {ButtonGroup, Button, Modal, Table } from 'react-bootstrap';
import FormExperiencia from './FormExperiencia'
import LogoPasayo from './LogoPasayo'
import TablaExp from './TablaExp'
//import CodeMirror from './CodeMirror'
import CodeMirror2 from './CodeMirror2'


const ModalIDE = (props) => {





  return (



      <Modal
        {...props}
        backdrop="static"
        keyboard={false}
        size="sm-down"
        centered
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
              <LogoPasayo/>
              {props.experiencia.titulo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TablaExp experiencia={props.experiencia}/>
          <CodeMirror2 onHide={props.onHide}
                      experiencia={props.experiencia._id}
                      canal={props.canal}
                      user={props.user}
          />

        </Modal.Body>

      </Modal>

  );
}


export default ModalIDE;
