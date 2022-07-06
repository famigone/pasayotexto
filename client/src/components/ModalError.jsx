import React, { useState, useEffect } from "react";
import {ButtonGroup, Button, Modal, Table } from 'react-bootstrap';
import LogoPasayo from './LogoPasayo'
import { useParams } from 'react-router';


const ModalError = (mostrar, msg) => {

  const [show, setShow] = useState(mostrar);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (

        <Modal

          backdrop="static"
          keyboard={false}
          size="sm-down"
          centered
          size="lg"
          show={show}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
                <LogoPasayo/>
                Ups!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>


          </Modal.Body>
          <Modal.Footer>
                   <Button variant="secondary" onClick={handleClose}>
                     Ok
                   </Button>

                 </Modal.Footer>
        </Modal>

    );
  }

export default ModalError
