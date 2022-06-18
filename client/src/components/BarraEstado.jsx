import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import api from '../api'
import  NavBara  from './NavBara'

const BarraEstado = ({user}) => {
  const [eluser, setEluser] = useState(user)

  async function getSesion() {
    try{
       const response = await api.getLogin()

       if (response.status === 200) {
        console.log("RECARGAZO: "+ response.data.user)
        setEluser(response.data.user)
      //  setUser(usuario)
       }
     } catch(error) {
       console.log('error', error);
     }
 }


useEffect(function() {
   if (!user) getSesion();
 }, []);
  let usuario
  if (!user && !eluser) usuario = null
  if (!user && eluser) usuario = eluser
  else usuario = user
  return (
    <NavBara user={usuario}/>
)}

export default BarraEstado
