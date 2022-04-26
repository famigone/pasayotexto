import React, { Component } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';


const TablaExp = ({experiencia}) => {
        console.log(experiencia)
        return (
          <Table striped bordered hover>
          <tbody>
          <tr>
            <td>Narrativa</td>
            <td>{experiencia.narrativa}</td>

          </tr>
            <tr>
              <td>Objetivo</td>
              <td>{experiencia.objetivo}</td>

            </tr>
            <tr>
              <td>Tema</td>
              <td>{experiencia.tema}</td>

            </tr>
          </tbody>
        </Table>
        )

}

export default TablaExp
