import React from 'react';
import Image from './Image'
import styled from 'styled-components'



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



const Card = ({experiencia}) => {

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
                     <div className="btn-group btn-group-sm" role="group" aria-label="Basic example" >

                      <button type="button" className="btn btn-warning"><i className="bi bi-play-fill"></i> Solución</button>
                      <button type="button" className="btn btn-warning"><i className="bi bi-pin-map"></i> Resolver</button>
                    </div>

                   <div className="card-footer text-black ">

                     <div className="d-flex justify-content-end">
                        <UnBadge> famigone </UnBadge>
                     </div>
                   </div>
            </UnaCard>
        )}

export default Card;
