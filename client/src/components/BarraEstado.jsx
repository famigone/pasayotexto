import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import api from '../api'
import  NavBara  from './NavBara'

const BarraEstado = ({currentUser, setCurrentUser}) => {

  return (
    <NavBara currentUser={currentUser} setCurrentUser={setCurrentUser}/>
)}

export default BarraEstado
