
import React, { Component, useState, useEffect } from 'react'
import  UserContext   from './UserContext';
import { createContext, useContext, useMemo } from "react";
import  UserProvider  from './UserProvider';
import UnSpinnerCentrado from './UnSpinnerCentrado';

import AuthService from "../services/auth.service";
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

const Login = ({setCurrentUser}) => {
  //const  { login }  = useContext(UserContext);
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  //const [from, setFrom] = useState("/experiencias")
  const [irHome, setIrHome] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const handleUser = (event) => setUser(event.target.value)
  const handlePass = (event) => setPass(event.target.value)
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/comunidad";
  const elUser = AuthService.getCurrentUser();

  const myLogin = () => {return (
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


  async function handleSubmit (event) {
        setLoading(true)
        event.preventDefault()
        const auth = await AuthService.postLogin(user, pass, from)
        if (auth){          
          const miUsuario = AuthService.getCurrentUser().username
          console.log("autorizado, navegando a comunidad",miUsuario)
          setCurrentUser(miUsuario)
          setLoading(false)
          navigate(from, { replace: true });          
        }
    }


if (loading) 
  return (<UnSpinnerCentrado/>)
if (elUser) 
  return (<Navigate to={from} replace={true} />)
if (!loading) 
  return (myLogin())
}

export default Login