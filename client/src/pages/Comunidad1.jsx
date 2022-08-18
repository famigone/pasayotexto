import StackGrid from "react-stack-grid";
import Experiencia from "./Experiencia"
import ModalIDE from "../components/ModalIDE"
import Card from '../components/Card'
import Filtro from '../components/Filtro'
import styled from 'styled-components'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { get } from 'axios';
import api from '../api'
import { createContext, useContext, useMemo } from "react";
import  UserProvider  from '../components/UserProvider';
import  UserContext  from '../components/UserContext';
import AuthService from "../services/auth.service";
import UnSpinnerCentrado from "../components/UnSpinnerCentrado"
import UseInfinite from "../customHooks/UseInfinite";
import {
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";

const Comunidad1 = () => {
  
  
  const constIncremento = 3
  const constLimite = 2
  const filtroInicial = {tema: "TODOS"}
  const [experiencias, setExperiencias] = useState([])
  const [filtro, setFiltro] = useState(filtroInicial)
  const [limite, setLimite] = useState(constLimite)
  const [canal, setCanal] = useState("")
  
  const [user, setUser] = useState(AuthService.getCurrentUser().username)
  //expActual es la experiencia clickeada actualmente, al clickear debe levantar
  //el modalIDEShow con los datos de esa exp
  const [expActual, setExpActual] = useState("")
  const [modalIDEShow, setModalIDEShow] = useState(false);
  const { loading, error, list } = UseInfinite(filtro, limite);
  
  const loader = useRef(null);

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/login";



  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setLimite((prev) => prev + constIncremento);
      console.log("llamo al pinche handleObserver")
    }    
  }, []);


  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  

  const handleFiltro = (newFiltro) => {
      console.log(newFiltro);
      setFiltro(newFiltro)
     
    }

  const handleClickExp = (exp, canal) => {
      setExpActual(exp)
      setModalIDEShow(true)
      setCanal(canal)

    }

 

     const handleCargar = () => {
           setLimite(limite+constIncremento)
          // getExperiencias(filtro)
       }

     const lanzarSpinner = () => {
      return <UnSpinnerCentrado/>
     }

  const onDelete = () => {}
  return (  
    
  <>
    
    <Filtro user={user}      
      handleFiltro={handleFiltro}
      handleCargar={handleCargar}/>
    
      {(!loading) && list.map((exp) => {
              return(
                <Card onDelete={onDelete} key={exp._id} experiencia={exp} handleClickExp={handleClickExp} canal={Math.random().toString(36).slice(2)}/>                
              )              
            })}                     
    
    <div>{loading && "Cargando experiencias..."}</div> 
    <div ref={loader}/>
    {loading && lanzarSpinner()}      
    {!user && lanzarSpinner()}      
    <ModalIDE experiencia={expActual}
              show={modalIDEShow}
              onHide={()=>setModalIDEShow(false)}
              canal={canal}
              user={user}
              />
</>

  )
}

export default Comunidad1;