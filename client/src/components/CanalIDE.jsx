import React, { useState } from "react";
import {ButtonGroup, Button, Modal, Table } from 'react-bootstrap';
import FormExperiencia from './FormExperiencia'
import LogoPasayo from './LogoPasayo'
import TablaExp from './TablaExp'
import CodeMirror from './CodeMirror'
import { useParams } from 'react-router';



const CanalIDE = (props) => {
    const { id, canal } = useParams();

    



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
                {canal +" "+ id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TablaExp experiencia={id}/>



          </Modal.Body>

        </Modal>
      </>
    );
  }

export default CanalIDE
