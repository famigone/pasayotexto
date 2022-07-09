import React, { useState, useEffect, useContext } from "react";
import Image from './Image'
import styled from 'styled-components'
import LogoPasayo from './LogoPasayo'
import TablaExp from './TablaExp'
import { Modal, ToggleButtonGroup, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import {Controlled as CodeMirror} from 'react-codemirror2';
import  UserContext  from '../components/UserContext';
import api from '../api'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');


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
  const [mostrar, setMostrar] = useState(false);
  const [codigo, setCodigo] = useState(experiencia.solucion);
  const options = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'material',

    }
    const getExperiencia = async() => {
      try {
      // const response = await get("/api/experiencias", {params:filtro});
        const response = await api.getExperienciaById(experiencia._id)
        setCodigo(response.data.data.solucion);
        console.log("el codiguete es ",codigo);
      } catch(error) {
        console.log('error', error);
      }
    }

    useEffect(function() {
      // console.log(id);
       getExperiencia();

     }, []);

     const runCode = () => {
          try {
            eval(codigo);
          } catch (e) {
            alert(e)
          }
        }

    return (
            <UnaCard >
              <Modal
                backdrop="static"
                keyboard={false}
                size="sm-down"
                centered
                fullscreen={true}
                show={mostrar}

              >
                <Modal.Header closeButton>
                  <Modal.Title>
                      <LogoPasayo/>
                      {experiencia.titulo}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <TablaExp experiencia={experiencia}/>
                    <CodeMirror
                      value={codigo}
                      options={options}
                      onBeforeChange={(editor, data, code) => {
                            setCodigo(code);
                      }}
                    />
                    <div className="d-grid gap-1">
                        <ButtonGroup>

                          <Button className="btn btn-warning" onClick={runCode}>
                            <i className="bi bi-play-fill"></i>
                          </Button>

                        </ButtonGroup>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="warning" onClick={()=>setMostrar(false)}>
                    Salir
                  </Button>
                </Modal.Footer>
              </Modal>

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
                           <Button className="btn btn-warning" onClick={() => setMostrar(true)}>
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
