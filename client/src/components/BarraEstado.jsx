import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import api from '../api'
import  NavBara  from './NavBara'

const BarraEstado = ({user}) => {
  //const [user, setUser] = useState("ingresar")

  async function getSesion() {
    try{
       const response = await api.getLogin()
       console.log("response: "+ response.data.user)
       if (response.status === 200) {
        let usuario= response.data.user
    //    setUser(usuario)
       }
     } catch(error) {
       console.log('error', error);
     }
 }


//useEffect(function() {
//   getSesion();
// }, []);

//console.log("BARRAESTADO: "+user)
  return (
    <NavBara user={user}/>
)}

export default BarraEstado
