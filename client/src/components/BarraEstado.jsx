import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import api from '../api'
import  NavBara  from './NavBara'

const BarraEstado = () => {
  const [user, setUser] = useState("ingresar")

  async function getSesion() {
    try{
       const response = await api.getLogin()
       console.log("response: "+ response.data.user)
       if (response.status === 200) {
        let usuario= response.data.user
        setUser(usuario)
       }
     } catch(error) {
       console.log('error', error);
     }
 }


useEffect(function() {
   getSesion();
 }, []);


  return (
    <NavBara username={user}/>
)}

export default BarraEstado
