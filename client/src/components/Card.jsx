import React from 'react';
import Image from './Image'
import styled from 'styled-components'



const UnaCard = styled.div.attrs({
    className: 'card text-black mb-3',
})`
width: 18rem;
background-color:#EEEEEE
`




const Card = ({title, body}) => {    

    return (
            <UnaCard>                  
                  <div className="card-header">SECUENCIAL</div>
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{body}</p>
                    
                  </div>

                     <div className="btn-group btn-group-sm" role="group" aria-label="Basic example" >
                      
                      <button type="button" className="btn btn-warning">Solución</button>
                      <button type="button" className="btn btn-warning">Resolver</button>
                    </div>

                   <div className="card-footer text-black ">
                      
                      <span class="badge bg-danger">famigone</span>
                   </div>
            </UnaCard>
            )

}

export default Card;
