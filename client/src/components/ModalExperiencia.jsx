import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import FormExperiencia from './FormExperiencia'



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
          <Modal.Title>Nueva Experiencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormExperiencia/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Mejor no
          </Button>
          <Button variant="warning">Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalExperiencia;

