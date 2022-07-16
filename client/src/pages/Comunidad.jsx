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
const Comunidad = () => {
  //const filtroInicial = {tema: "Todos", mias:true}
  const  { user }  = useContext(UserContext);
  const constIncremento = 10
  const constLimite = 10
  const filtroInicial = {tema: "TODOS"}
  const [experiencias, setExperiencias] = useState([])
  const [filtro, setFiltro] = useState(filtroInicial)
  const [limite, setLimite] = useState(constLimite)
  const [canal, setCanal] = useState("")
  //expActual es la experiencia clickeada actualmente, al clickear debe levantar
  //el modalIDEShow con los datos de esa exp
  const [expActual, setExpActual] = useState("")
  const [modalIDEShow, setModalIDEShow] = useState(false);

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
    // const response = await get("/api/experiencias", {params:filtro});
      //if (!filtro) setFiltro(filtroInicial)
      //const unFiltro = {tema: filtro.tema, user:filtro.autor, limite:limite}
      //const unFiltro = {tema: filtro.tema,  limite:limite}
      filtro.limite= limite
      const response = await api.getAllExperiencias(filtro)
      setExperiencias(response.data.data);
    //  console.log(experiencias);
    } catch(error) {
      console.log('error', error);
    }
  }

  useEffect(function() {
     getExperiencias(filtro);
     //console.log("limite ",limite)
   }, [limite]);


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


    return (

        <Divido onScroll={handleScroll} >
            <Filtro user={user.name} refrescarExp={getExperiencias} handleFiltro={handleFiltro} handleCargar={handleCargar}/>
            <StackGrid columnWidth={300}>
              {experiencias.map((exp) => {
                      return(
                        <Card onDelete={onDelete} key={exp._id} experiencia={exp} handleClickExp={handleClickExp} canal={Math.random().toString(36).slice(2)}/>
                      )
                    })}
            </StackGrid>
            <ModalIDE experiencia={expActual}
                      show={modalIDEShow}
                      onHide={()=>setModalIDEShow(false)}
                      canal={canal}
                      user={user.name}
                      />
        </Divido>
            )
}

export default Comunidad;
