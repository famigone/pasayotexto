import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import FormTrayecto from './FormTrayecto'
import LogoPasayo from './LogoPasayo'
import Select from 'react-select'
import AsyncSelect from 'react-select/async';

import api from '../api'





const ModalSelectTrayecto = (props) => {
  const [options, setOptions] = useState([""]);
  const [trayectoid, setTrayectoid] = useState([""]);
  const [filtoTrayecto, setFiltoTrayecto] = useState([""]);




const handleSelect = (newValue) => {
  console.log("newValue "+newValue.value)
  setTrayectoid(newValue.value)
  return newValue.value
}
const seleccionarx = () => props.seleccionar(trayectoid)

  useEffect(() => {
    const getData = async () => {
      
      const arr = [];
      const response = await api.getAllTrayectos(filtoTrayecto)
  //    console.log("response.data.data "+response.data.data[0].titulo)
      let result = response.data.data.map((trayecto) => {
        return arr.push({value: trayecto._id, label: trayecto.titulo});
      });
      setOptions(arr);
    };
    getData();
  }, []);

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
               Seleccioná un Trayecto

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
     <Select
        
        name="trayectoid"
        className="input-cont"
        placeholder= "Seleccioná un trayecto"
        options={options}
        onChange={handleSelect}
        
      />     
        </Modal.Body>
        <Modal.Footer>
          <Button 
              variant="warning" 
              onClick={seleccionarx}
              >Seleccionar
          </Button>
          <Button 
              variant="secondary" 
              onClick={props.limpiar}
              >Limpiar
              </Button>
      </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalSelectTrayecto;
