import StackGrid from "react-stack-grid";
import Experiencia from "./Experiencia"
import ModalIDE from "../components/ModalIDE"
import Card from '../components/Card'
import Filtro from '../components/Filtro'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react';
import { get } from 'axios';
import api from '../api'


const Comunidad = () => {
  //const filtroInicial = {tema: "Todos", mias:true}
  const constIncremento = 10
  const constLimite = 10
  const filtroInicial = {tema: "Todos"}
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

  const getExperiencias = async(filtro) => {
    try {
    // const response = await get("/api/experiencias", {params:filtro});
      if (!filtro) setFiltro(filtroInicial)
      const unFiltro = {tema: filtro.tema, limite:limite}
      const response = await api.getAllExperiencias(unFiltro, { mode: 'cors' })
      setExperiencias(response.data.data);
      //console.log(experiencias);
    } catch(error) {
      console.log('error', error);
    }
  }

  useEffect(function() {
     getExperiencias(filtro);
     //console.log("limite ",limite)
   }, [limite]);


  const handleFiltro = (newFiltro) => {
      setFiltro(newFiltro)
      getExperiencias(newFiltro);
      //console.log(newFiltro);
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
            <Filtro refrescarExp={getExperiencias} handleFiltro={handleFiltro} handleCargar={handleCargar}/>
            <StackGrid columnWidth={300}>
              {experiencias.map((exp) => {
                      return(
                        <Card key={exp._id} experiencia={exp} handleClickExp={handleClickExp} canal={Math.random().toString(36).slice(2)}/>
                      )
                    })}
            </StackGrid>
            <ModalIDE experiencia={expActual} show={modalIDEShow} onHide={()=>setModalIDEShow(false)} canal={canal}/>
        </Divido>
            )
}

export default Comunidad;
