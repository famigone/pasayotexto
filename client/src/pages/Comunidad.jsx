import StackGrid from "react-stack-grid";
import Experiencia from "./Experiencia"
import ModalIDE from "../components/ModalIDE"
import Card from '../components/Card'
import Filtro from '../components/Filtro'
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

const Comunidad = () => {
  //const filtroInicial = {tema: "Todos", mias:true}
  //const  { user }  = useContext(UserContext);
  
  const constIncremento = 10
  const constLimite = 10
  const filtroInicial = {tema: "TODOS"}
  const [experiencias, setExperiencias] = useState([])
  const [filtro, setFiltro] = useState(filtroInicial)
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

  height: 545px;
  overflow-y: auto;
  `

  const onDelete = () => {
    console.log("Invocó onDelete")
    getExperiencias({})
  }

  const getExperiencias = async(filtro) => {
    try {
      setLoading(true)
      filtro.limite= limite
      const response = await api.getAllExperiencias(filtro)
      setExperiencias(response.data.data);
      setLoading(false)
      //si response falla por 401 o 403 => redirigir al login
      console.log("response  ",response.status)

    } catch(error) {
      setLoading(false)
      console.log('error', error);
      //if (response.status == 401 || response.res.status == 403)
        //console.log("a loguearse caraju  ",response.status)
       // navigate(from, { replace: true });
    }
  }

  useEffect(function() {
     getExperiencias(filtro);
     //console.log("limite ",limite)
   }, [limite]);

  
   useEffect(function() {
    setUser( AuthService.getCurrentUser().username)
  }, []);


  

  const handleFiltro = (newFiltro) => {
      console.log(newFiltro);
      setFiltro(newFiltro)
      getExperiencias(newFiltro);
    }

  const handleClickExp = (exp, canal) => {
      setExpActual(exp)
      setModalIDEShow(true)
      setCanal(canal)
    //  console.log(exp)
      //getExperiencias(newFiltro);
      //console.log(newFiltro);
    }




   const handleScroll = (e) => {
       const { offsetHeight, scrollTop, scrollHeight} = e.target

       if (offsetHeight + scrollTop >= scrollHeight) {
         setLimite(limite+constIncremento)
         getExperiencias(filtro)

        // console.log(limite+constIncremento)
       }
       //console.log(limite+constIncremento)
       //setLimite(limite+constIncremento)

     }

     const handleCargar = () => {
           setLimite(limite+constIncremento)
          // getExperiencias(filtro)
       }

     const lanzarSpinner = () => {
      return <UnSpinnerCentrado/>
     }

  console.log("U S E R "+user)   
  return (  
  <Divido onScroll={handleScroll} >
    <Filtro user={user}
      refrescarExp={getExperiencias}
      handleFiltro={handleFiltro}
      handleCargar={handleCargar}/>
    <StackGrid columnWidth={300}>
      {(!loading) && experiencias.map((exp) => {
              return(
                <Card onDelete={onDelete} key={exp._id} experiencia={exp} handleClickExp={handleClickExp} canal={Math.random().toString(36).slice(2)}/>
              )
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

export default Comunidad;
