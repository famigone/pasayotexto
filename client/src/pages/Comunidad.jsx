import React from 'react';
import StackGrid from "react-stack-grid";
import Experiencia from "./Experiencia"
import Card from '../components/Card'
import Filtro from '../components/Filtro'
import styled from 'styled-components'


const Container = styled.div.attrs({
    className: 'container',
})``

const Comunidad = () => {


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