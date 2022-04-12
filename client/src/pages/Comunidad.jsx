import StackGrid from "react-stack-grid";
import Experiencia from "./Experiencia"
import Card from '../components/Card'
import Filtro from '../components/Filtro'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react';
import { get } from 'axios';
import api from '../api'

const Comunidad = () => {
  const [experiencias, setExperiencias] = useState([])


  useEffect(function() {
     async function getExperiencias() {
       try {
        //const response = await get("/api/experiencias");
         const response = await api.getAllExperiencias()
         setExperiencias(response.data);
       } catch(error) {
         console.log('error', error);
       }
     }
     getExperiencias();
   }, []);

    return (
        <div>
            <Filtro/>
            <StackGrid columnWidth={100}>


                <div key="key2">
                    <Experiencia/>
                </div>
            </StackGrid>
        </div>
            )

}

export default Comunidad;
