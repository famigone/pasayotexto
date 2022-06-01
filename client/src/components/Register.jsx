import React, { Component, useState } from 'react'

import styled from 'styled-components'
import { Button, Card, Form, Modal, Container } from 'react-bootstrap';
import logo from '../img/pasayotexto_small.png'
import pasayo from '../img/pasayotexto.png'
import axios from 'axios'
import api from '../api'
const Register = () => {

  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [pass2, setPass2] = useState("")
  const [mail, setMail] = useState("")
  const [mail2, setMail2] = useState("")
  const [redirectTo, setRedirectTo] = useState("")
  const handleUser = (event) =>
      setUser(event.target.value)


  const handlePass = (event) =>
      setPass(event.target.value)


  const handlePass2 = (event) =>
      setPass2(event.target.value)


  const handleMail = (event) =>
      setMail(event.target.value)

  const handleMail2 = (event) =>
      setMail2(event.target.value)



  const handleSubmit = (event) => {
      console.log('sign-up handleSubmit, username: ')
      console.log(user)
      event.preventDefault()
      //request to server to add a new username/password
      async function postRegister() {
        try {
          //const response = await post('/experiencia', experiencia);
          const usuario =  {
        			username: user,
        			password: pass
        		}
          const response = await api.postRegister(usuario)
          console.log(response)
          //redireeeeeeeeeeeeeeeeect
          //props.history.push(`/articles/${response.data._id}`);
        } catch(error) {
          console.log('error', error);
        }

      }
      postRegister()

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
                    value={pass}
                    onChange={handlePass}
                    />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Control
                  type="password"
                  placeholder="Confirma la Contraseña"
                  name="pass"
                  value={pass2}
                  onChange={handlePass2}
                  />
  </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">

      <Form.Control
                    type="email"
                    placeholder="Correo"
                    name="mail"
                    value={mail}
                    onChange={handleMail}
                    />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">

      <Form.Control
                    type="email"
                    placeholder="Confirma tu Correo"
                    name="mail2"
                    value={mail2}
                    onChange={handleMail2}
      />

    </Form.Group>

    <Button variant="warning" type="submit" onClick={handleSubmit}>
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

export default Register
