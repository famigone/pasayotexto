import React from 'react';
import Image from './Image'
import styled from 'styled-components'
import { ToggleButtonGroup, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';


const UnaCard = styled.div.attrs({
    className: 'card text-black mb-3',
})`
width: 18rem;
background-color:#EEEEEE
`

const UnBadge = styled.div.attrs({
    className: 'badge bg-danger',
})`


`



const Card = ({experiencia, handleClickExp, canal}) => {

    return (
            <UnaCard >
                  <div className="card-header"><b>{experiencia.titulo}</b></div>
                  <div className="card-body">
                    <h5 className="card-title"></h5>

                    <p className="card-text">{experiencia.narrativa}</p>

                  </div>
                  <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Objetivo Didáctico:</b> {experiencia.objetivo}</li>
                        <li className="list-group-item"><b>Tema:</b> {experiencia.tema}</li>
                        <li className="list-group-item"><b>Tópico:</b> <span className="badge bg-success">cumpleaños</span></li>
                  </ul>

                       <ButtonGroup >
                           <Button className="btn btn-warning" >
                             <i className="bi bi-play-fill"></i>
                           </Button>
                           <Button className="btn btn-warning" onClick={() => handleClickExp(experiencia, canal)}>
                             <i className="bi bi-pin-map"></i>
                           </Button>
                         </ButtonGroup >




                   <div className="card-footer text-black ">

                     <div className="d-flex justify-content-end">
                        <UnBadge> {experiencia.user} </UnBadge>
                     </div>
                   </div>
            </UnaCard>
        )}

export default Card;
