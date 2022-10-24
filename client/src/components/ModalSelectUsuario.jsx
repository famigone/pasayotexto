import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import FormTrayecto from './FormTrayecto'
import LogoPasayo from './LogoPasayo'
import Select from 'react-select'
import AsyncSelect from 'react-select/async';

import api from '../api'





const ModalSelectUsuario = (props) => {
  const [options, setOptions] = useState([""]);
  const [usuarioid, setUsuarioid] = useState(undefined);
  const [filtoTrayecto, setFiltoTrayecto] = useState([""]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);



const handleSelect = (newValue) => {
  console.log("ACAAAAAAAAA "+newValue.label)  
  setUsuarioid(newValue.label)
  props.seleccionar(newValue.label)
  return newValue.value
}
const seleccionarx = () => props.seleccionar(usuarioid)

useEffect(() => {
  const getData = async () => {
    
    const arr = [];
    const response = await api.getAllUser()
//    console.log("response.data.data "+response.data.data[0].titulo)
    let result = response.data.data.map((user) => {
      return arr.push({value: user._id, label: user.username});
    });
    setOptions(arr);
    setCargandoUsuarios(false)
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
               Seleccioná un Usuario para filtrar sus sesiones
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
     <Select
        
        name="userid"
        className="input-cont"
        placeholder= "Seleccioná un usuario"
        options={options}
        onChange={handleSelect}
        isSearchable={true}
        isClearable={true}
        isLoading={cargandoUsuarios}
      />     
        </Modal.Body>
        <Modal.Footer>
          <Button 
              variant="warning" 
              onClick={seleccionarx}
              >Seleccionar
          </Button>

      </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalSelectUsuario;
