
import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { Form, ToggleButtonGroup, ButtonGroup, ToggleButton, Button, Modal } from 'react-bootstrap';

import Logo from './Logo'
import Links from './Links'

import api from '../api'
import ModalSelectUsuario from "./ModalSelectUsuario";
import Select from 'react-select'
import AsyncSelect from 'react-select/async';
const Container = styled.div.attrs({
    className: 'container',
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-light',    
})`
   background-color: #eeeeee
`




const FiltroUser = ({user, refrescarExp, handleFiltro, handleCargar, filtro}) => {
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
  const [options, setOptions] = useState([""]);

  const [userId, setUserId] = useState(undefined);
  const [modalUsuario, setModalUsuario] = useState(false);


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
  }, [userId]);

  

  const aplicarFiltroUsuario =  (userId) => {
    
    
    console.log("FIltroUser "+userId)
    handleFiltro(userId)
    setModalUsuario(false)    
    
  }

   return (
            <div>
            

            
                <Nav>
                     <div className="container-fluid">                        
                          <div className="collapse navbar-collapse" id="navbarSupportedContent">                              
                            <button className="btn btn-warning" onClick={()=>setModalUsuario(true)}>
                            <i class="bi bi-person-circle"></i> Seleccionar Usuario
                            </button>

                        </div>
                        <ModalSelectUsuario 
                          show={modalUsuario} 
                          seleccionar = {aplicarFiltroUsuario}                           
                          onHide={()=>setModalUsuario(false)} 
                          user={user}/>
                      </div>
                </Nav>


             <br/>
             

            </div>

            )
}

export default FiltroUser

