import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import FormTrayecto from './FormTrayecto'
import LogoPasayo from './LogoPasayo'



const ModalTrayecto = (props) => {


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
               Nuevo Trayecto

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTrayecto {...props}/>
        </Modal.Body>

      </Modal>
    </>
  );
}


export default ModalTrayecto;
