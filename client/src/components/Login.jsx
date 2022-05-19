import React, { Component, useState } from 'react'

import styled from 'styled-components'
import { Button, Card, Form, Modal, Container } from 'react-bootstrap';
import logo from '../img/pasayotexto_small.png'
import pasayo from '../img/pasayotexto.png'
const Login = () => {

  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")

  const handleUser = (event) => setUser(event.target.value)

  const handlePass = (event) => setPass(event.target.value)




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

  <Form>
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
                    placeholder="Usuario"
                    value={pass}
                    onChange={handlePass}
                    />
    </Form.Group>

    <Button variant="warning"
            type="submit"
            
            >
      Entrar
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
