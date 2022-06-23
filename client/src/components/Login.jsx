import React, { Component, useState } from 'react'
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import styled from 'styled-components'
import { Button, Card, Form, Modal, Container } from 'react-bootstrap';
import logo from '../img/login.png'
import pasayo from '../img/pasayotexto.png'
import axios from 'axios'
import api from '../api'
const Login = ({actualizarUsuario}) => {

  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  //const [from, setFrom] = useState("/experiencias")
  const [irHome, setIrHome] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  const handleUser = (event) => setUser(event.target.value)

  const handlePass = (event) => setPass(event.target.value)
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  async function logout(event) {
    try{
       event.preventDefault()
       console.log('logging out')
       const usuario =  {
           username: user,
           password: pass,
         }
       const response = await api.postLogout(usuario)
       console.log("response: "+response)
       if (response.status === 200) {
            console.log("VA A LLAMAR A ACTUALIZAR USUARIO")
            setLoggedIn(false)
            actualizarUsuario(usuario.username)
       }
     } catch(error) {
       console.log('error', error);
     }
     }

  async function postLogin() {
    try {
      //const response = await post('/experiencia', experiencia);
      const usuario =  {
          username: user,
          password: pass,
        }

      const response = await api.postLogin(usuario)
      //console.log("response: " + response.status)
      if (response.status === 200) {
          // console.log("entroooo al 200: "+response.data.username)
           setLoggedIn(true)
           actualizarUsuario(response.data.username)
           console.log("nos vamos a: "+from)
           navigate(from, { replace: true });

      }else{console.log("algo salió mal ")}
      //console.log(response)
      //seteo en true el estado de redirección
      //setIrHome(true)
    } catch(error) {
      console.log('error', error);
    }
  }

  const handleSubmit = (event) => {

        event.preventDefault()
      //  console.log('handleSubmit')
        postLogin()
    }






return(
  <div className="row">
      <div className="col">

      </div>
      <div className="col">

<br/><br/><br/>
  <Container>
  <Card style={{ width: '22rem' }}>
  <center><img src={logo} alt="C4" width={"100%"} /></center>

  <Card.Body
  bg="light"
  className="mb-2"

  >

  <Form onSubmit={handleSubmit}>

    <Form.Group className="mb-3" controlId="formBasicEmail">


      <Form.Control name="usuario"
                    placeholder="Usuario"
                    value={user}
                    onChange={handleUser}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">

      <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    name="pass"
                    value={pass}
                    onChange={handlePass}
                    />
    </Form.Group>
    <div className="d-grid gap-2">
      <Button variant="warning"
              type="submit"

              >
      <i className="bi bi-chat-heart"></i> Entrar
      </Button>
    </div>
    <br/>
    <div className="d-grid gap-2">
      <Link to="/register" className="btn btn-warning">
        <i className="bi bi-person-hearts"></i>  Crear Cuenta
      </Link>
    </div>
  </Form>
   </Card.Body>
  </Card>

  </Container>
  </div>
  <div className="col">

  </div>
</div>
)}

export default Login
