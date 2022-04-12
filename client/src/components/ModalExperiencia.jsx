import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import FormExperiencia from './FormExperiencia'
import LogoPasayo from './LogoPasayo'



const ModalExperiencia = (props) => {


  return (
    <>


      <Modal
        {...props}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
              <LogoPasayo/>
               Nueva Experiencia

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormExperiencia {...props}/>
        </Modal.Body>
        
      </Modal>
    </>
  );
}


export default ModalExperiencia;
