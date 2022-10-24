import StackGrid from "react-stack-grid";
import Experiencia from "./Experiencia"
import ModalIDE from "../components/ModalIDE"
import CardSesion from '../components/CardSesion'
import FiltroUser from '../components/FiltroUser'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react';
import { get } from 'axios';
import api from '../api'
import { createContext, useContext, useMemo } from "react";
import  UserProvider  from '../components/UserProvider';
import  UserContext  from '../components/UserContext';
import AuthService from "../services/auth.service";
import UnSpinnerCentrado from "../components/UnSpinnerCentrado"
import {
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";

const Sesiones = () => {
  //const filtroInicial = {tema: "Todos", mias:true}
  //const  { user }  = useContext(UserContext);
  
  const constIncremento = 10
  const constLimite = 20
  const filtroInicial = {tema: "TODOS", autor:"TODAS"}
  const [experiencias, setExperiencias] = useState([])
  const [filtro, setFiltro] = useState(undefined)
  const [limite, setLimite] = useState(constLimite)
  const [canal, setCanal] = useState("")
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(AuthService.getCurrentUser().username)
  //expActual es la experiencia clickeada actualmente, al clickear debe levantar
  //el modalIDEShow con los datos de esa exp
  const [expActual, setExpActual] = useState("")
  const [modalIDEShow, setModalIDEShow] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/login";

  const Divido = styled.nav.attrs({
      className: 'div',
  })`

  
  overflow-y: auto;
  `


  const getSesiones = async(userId) => {
    try {
      setLoading(true)
      //filtro.limite= limite
      console.log(userId)
      const response = await api.getAllCodesesion({userId})
      setExperiencias(response.data.data);
      setLoading(false)
      //si response falla por 401 o 403 => redirigir al login
      console.log("recupero  ", response.data.data)

    } catch(error) {
      setLoading(false)
      console.log('error', error);
      //if (response.status == 401 || response.res.status == 403)
        //console.log("a loguearse caraju  ",response.status)
       // navigate(from, { replace: true });
    }
  }

  useEffect(async() => {     
     await getSesiones(filtro);     
     //console.log("limite ",limite)
   }, []);




  

  const handleFiltro = (userId) => {
      console.log("filtrazoo userId "+userId);
      setFiltro(userId)
      getSesiones(userId);
      
    }

  const handleClickExp = (exp, canal) => {
      setExpActual(exp)
      setModalIDEShow(true)
      setCanal(canal)
    //  console.log(exp)
      //getExperiencias(newFiltro);
      //console.log(newFiltro);
    }




     const handleCargar = () => {
           setLimite(limite+constIncremento)
          // getExperiencias(filtro)
       }

     const lanzarSpinner = () => {
      return <UnSpinnerCentrado/>
     }

  //console.log("U S E R "+user)   
  return (  

    <Divido >
    <FiltroUser user={user}
      refrescarExp={getSesiones}
      handleFiltro={handleFiltro}
      handleCargar={handleCargar}
      filtro = {filtro}
      />
    <StackGrid columnWidth={300}>
      {(!loading) && experiencias.map((exp) => {
              
              if (exp.experienciaid){
              
              return(
                <CardSesion 
                  codigoSesion={exp.codigo} 
                  userId={filtro} 
                  key={exp._id} 
                  experiencia={exp.experienciaid} 
                  handleClickExp={handleClickExp} 
                  canal={Math.random().toString(36).slice(2)}/>
              )
              }
            })}      
    </StackGrid>
    {loading && lanzarSpinner()}      
    {!user && lanzarSpinner()}      
    <ModalIDE experiencia={expActual}
              show={modalIDEShow}
              onHide={()=>setModalIDEShow(false)}
              canal={canal}
              user={user}
              />

</Divido>
  )
}

export default Sesiones;