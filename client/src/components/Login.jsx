import React, { Component, useState } from 'react'
import { Navigate } from 'react-router-dom';
import styled from 'styled-components'
import { Button, Card, Form, Modal, Container } from 'react-bootstrap';
import logo from '../img/pasayotexto_small.png'
import pasayo from '../img/pasayotexto.png'
import axios from 'axios'
import api from '../api'

const Login = () => {

  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [irHome, setIrHome] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  const handleUser = (event) => setUser(event.target.value)

  const handlePass = (event) => setPass(event.target.value)

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
            setLoggedIn(false)
            setUsername("")
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
      console.log("va a invocarrrrrr: ")
      const response = await api.postLogin(usuario)
      //console.log("response: " + response)
      if (response.status === 200) {
           console.log(response.data.username)
           setLoggedIn(true)
           setUsername(response.data.username)
           setIrHome(true)
      }else{console.log("algo salió mal ")}
      //console.log(response)
      //seteo en true el estado de redirección
      setIrHome(true)
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
  <center><img src={pasayo} alt="C4" width={"100%"} /></center>

  <Card.Body
  bg="light"
  className="mb-2"

  >

  <Form onSubmit={handleSubmit}>
  {irHome && (
          <Navigate to="/" replace={true} />
        )}
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

    <Button variant="warning"
            type="submit"

            >
      Entrar
    </Button>
    <Button variant="warning" onClick={logout}>
      Logout
    </Button>
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
