import React, { useState, useEffect, useContext } from "react";
import Image from './Image'
import logo from '../img/PASAYOTEXTO_white.png'
import styled from 'styled-components'
import LogoPasayo from './LogoPasayo'
import TablaExp from './TablaExp'
import { Modal, ToggleButtonGroup, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import {Controlled as CodeMirror} from 'react-codemirror2';
import  UserContext  from '../components/UserContext';
import api from '../api'
import axios from 'axios'


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

const Card = ({onDelete, experiencia, handleClickExp, canal}) => {
  const [mostrar, setMostrar] = useState(false);
  const [codigo, setCodigo] = useState(experiencia.solucion);
  const [mostrarModalDelete, setMostrarModalDelete] = useState(false);

  const  { user }  = useContext(UserContext);
const mostrarModal = () => {
  return (
    <Modal show={mostrarModalDelete} onHide={setMostrarModalDelete}>
        <Modal.Header closeButton>
          <Modal.Title><LogoPasayo/>Atención!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vas a eliminar definitivamente esta narrativa.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModalDelete(false)}>
            Mejor no...
          </Button>
          <Button variant="warning" onClick={handleDelete}>
            Sí, eliminar!
          </Button>
        </Modal.Footer>
      </Modal>
  )
}


function handleDelete(event) {
      async function deleteExperiencia() {
        try {
            console.log("va  a borrar  ",experiencia._id)
            const response = await api.deleteExperienciaById(experiencia._id)
            setMostrarModalDelete(false)
            //invoco método en padre Comunidad para que limpie los eliminados
            onDelete()
        } catch(error) {
          console.log('error', error);
        }
      }
      deleteExperiencia();
    }


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
        //console.log("el codiguete es ",codigo);
      } catch(error) {
        console.log('error', error);
      }
    }

    useEffect(function() {
      // console.log(id);
       getExperiencia();

     }, []);



     const botonera = () => {
     //  console.log("props.user "+props.user)
    //  console.log("DUEÑEEEEE user ",user ) //undefined
    //  console.log("DUEÑEEEEE experiencia.user ", experiencia.user ) //undefined
       if (user.name !== experiencia.user)
         return botoneraSimple()
       else
         return botoneraOwner()
     }

     const botoneraSimple = () => {
       return (
         <div className="d-grid gap-2">
           <ButtonGroup >
             <Button className="btn btn-warning" onClick={() => setMostrar(true)}>
               <i className="bi bi-play-fill"></i>
             </Button>
             <Button className="btn btn-warning" onClick={() => handleClickExp(experiencia, canal)}>
               <i className="bi bi-pin-map"></i>
             </Button>
           </ButtonGroup >
         </div>
       )
     }
     const botoneraOwner = () => {
       return (

           <div className="d-grid gap-3">
             <ButtonGroup >
               <Button className="btn btn-warning" onClick={() => setMostrar(true)}>
                 <i className="bi bi-play-fill"></i>
               </Button>
               <Button className="btn btn-warning" onClick={() => handleClickExp(experiencia, canal)}>
                 <i className="bi bi-pin-map"></i>
               </Button>
               <Button className="btn btn-warning" onClick={() => setMostrarModalDelete(true)}>
                 <i className="bi bi-eye-slash-fill"></i>
               </Button>
             </ButtonGroup >
           </div>

       )
     }

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

                  </ul>

                  {botonera()}
                  {mostrarModal()}



                   <div className="card-footer text-black ">

                     <div className="d-flex justify-content-end">
                        <UnBadge> {experiencia.user} </UnBadge>
                     </div>
                   </div>
            </UnaCard>
        )}

export default Card;
