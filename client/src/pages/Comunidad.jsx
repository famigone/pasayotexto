import React from 'react';
import StackGrid from "react-stack-grid";
import Experiencia from "./Experiencia"
import Card from '../components/Card'
const Comunidad = () => {
    console.log("adentrooo")

    return (
        <StackGrid columnWidth={100}>
             

            <div key="key2">
                <Experiencia/>
            </div>                                                              
        </StackGrid>
            )

}

export default Comunidad;