import React, { Component, useState, useCallback, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import styled from 'styled-components'
import { Button, Alert, Card, Form, Modal, Container } from 'react-bootstrap';
import logo from '../img/pasayotexto_small.png'
import pasayo from '../img/login.png'
import axios from 'axios'
import api from '../api'




const Register = () => {

  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [pass2, setPass2] = useState("")
  const [errorMail, setErrorMail] = useState(false)
  const [errorPass, setErrorPass] = useState(false)
  const [errorBlanco, setErrorBlanco] = useState(false)
  const [irLogin, setIrLogin] = useState(false)
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


      async function postRegister() {
        try {
          //const response = await post('/experiencia', experiencia);
          const usuario =  {
              username: user,
              password: pass,
              mail: mail
            }
          const response = await api.postRegister(usuario)
          console.log(response)
          //seteo en true el estado de redirección
          setIrLogin(true)
        } catch(error) {
          console.log('error', error);
        }
      }
  const validarMail = () => {return (mail==mail2)}

  const validarPass = () => {return (pass==pass2)}

  const handleSubmit = (event) => {
    //sin el prevent se dispara el submit aunque no valide
      event.preventDefault()
    //validamos blancos
      if ((!user  || user ==="")   ||
          (!pass  || pass ==="")   ||
          (!mail2 || mail2==="")   ||
          (!mail  || mail ==="")   ||
          (!mail2 || mail2==="")
        ) setErrorBlanco(true)
      else setErrorBlanco(false)

      if (!validarPass()) setErrorPass(true)
      else setErrorPass(false)

      if (!validarMail()) setErrorMail(true)
      else setErrorMail(false)
      // si todo ok hacemos submit y redirección a login
      if (validarPass() && validarMail())
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
  {irLogin && (
          <Navigate to="/login" replace={true} />
        )}
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
  <Alert variant="danger" show={errorPass}>
    <p>
       <i className="bi bi-robot"></i> Las contraseñas no coinciden...
    </p>
  </Alert>

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
    <Alert variant="danger" show={errorMail}>
      <p>
         <i className="bi bi-robot"></i> Los correos no coinciden...
      </p>
    </Alert>
    <Alert variant="danger" show={errorBlanco}>
        <p>
           <i className="bi bi-robot"></i> Todos los campos son obligatorios...
        </p>
      </Alert>
      <Alert variant="warning" show={irLogin}>
          <p>
             <i className="bi bi-robot"></i> EXCELENTE! ya tenes tu cuenta PASAYO creada. En 5 segundos te redirigiremos al login de PASAYO TEXTO.
          </p>
      </Alert>


<div className="d-grid gap-2">
    <Button variant="warning" type="submit" onClick={handleSubmit}>
      <i class="bi bi-person-hearts"></i> Crear la cuenta
    </Button>
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

export default Register
