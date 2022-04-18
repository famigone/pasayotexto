import StackGrid from "react-stack-grid";
import Experiencia from "./Experiencia"
import Card from '../components/Card'
import Filtro from '../components/Filtro'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react';
import { get } from 'axios';
import api from '../api'


const Comunidad = () => {
  //const filtroInicial = {tema: "Todos", mias:true}
  const filtroInicial = {tema: "Todos"}
  const [experiencias, setExperiencias] = useState([])
  const [filtro, setFiltro] = useState(filtroInicial)
  const [limite, setLimite] = useState(5)
  const constIncremento = 5
  const Divido = styled.nav.attrs({
      className: 'div',
  })`

  height: 545px;
  overflow-y: auto;
  `

  const getExperiencias = async(filtro) => {
    try {
    // const response = await get("/api/experiencias", {params:filtro});
      const unFiltro = {tema: filtro.tema, limite:limite}
      const response = await api.getAllExperiencias(unFiltro)
      setExperiencias(response.data.data);
      //console.log(experiencias);
    } catch(error) {
      console.log('error', error);
    }
  }


  const handleFiltro = (newFiltro) => {
      setFiltro(newFiltro)
      getExperiencias(newFiltro);
      //console.log(newFiltro);
    }


  useEffect(function() {
     getExperiencias(filtro);
     //console.log("limite ",limite)
   }, [limite]);


   const handleScroll = (e) => {
       const { offsetHeight, scrollTop, scrollHeight} = e.target

       if (offsetHeight + scrollTop === scrollHeight) {
         setLimite(limite+constIncremento)
         getExperiencias(filtro)
         console.log(limite+constIncremento)
       }
       console.log(limite+constIncremento)
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
                        <Card key={exp._id} experiencia={exp}/>
                      )
                    })}



            </StackGrid>
        </Divido>
            )
}

export default Comunidad;
