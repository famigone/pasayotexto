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


  const getExperiencias = async(filtro) => {
    try {
    // const response = await get("/api/experiencias", {params:filtro});
      const response = await api.getAllExperiencias(filtro)
      setExperiencias(response.data.data);
      //console.log(experiencias);
    } catch(error) {
      console.log('error', error);
    }
  }


  const handleFiltro = (newFiltro) => {
      setFiltro(newFiltro)
      getExperiencias(newFiltro);
      console.log(newFiltro);
    }


  useEffect(function() {
     getExperiencias();
     console.log("ejecutazo")
   }, []);

    return (

        <div>
            <Filtro refrescarExp={getExperiencias} handleFiltro={handleFiltro}/>
            <StackGrid columnWidth={300}>
              {experiencias.map((exp) => {
                      return(
                        <Card key={exp._id} experiencia={exp}/>
                      )
                    })}



            </StackGrid>
        </div>
            )
}

export default Comunidad;
