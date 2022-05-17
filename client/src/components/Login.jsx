import React, { Component } from 'react'
import styled from 'styled-components'
import { Button,Card, Form, Modal, Container } from 'react-bootstrap';
import logo from '../img/pasayotexto_small.png'

const Login = () => {
return(
  <Container>

  <Card body
  bg="light"
  style={{ width: '28rem' }}
  className="mb-2"

  >
  <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button variant="warning" type="submit">
      Submit
    </Button>
  </Form>
  </Card>
  </Container>
)}

export default Login
