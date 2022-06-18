import React, { Component, useState, useEffect } from 'react'
import { Navigate, BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import  CanalIDE  from '../components/CanalIDE'
import  NavBara  from '../components/NavBara'
import  BarraEstado  from '../components/BarraEstado'
import { Comunidad } from '../pages'
import  Login  from '../components/Login'
import  Register  from '../components/Register'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';


const App = () => {
    const [user, setUser] = useState(null)
    const actualizarUsuario = (usuario) => {
      setUser(usuario)
    //  console.log("actualizó el usuario " + user)
    }
    return (
          <BrowserRouter>
            <BarraEstado user={user}/>
            <Routes>

                <Route path="comunidad" element={<RequireAuth user={user}/>}>
                  <Route path="" element={<Comunidad user={user}/>} />
                </Route>
                <Route path="canal/:id/:canal" element={<CanalIDE/>} />
                <Route path="login" element={<Login actualizarUsuario={actualizarUsuario}/>} />
                <Route path="register" element={<Register/>} />
            </Routes>
          </BrowserRouter>
    )
}


function RequireAuth({user}) {
    if (user) {
      return <Outlet />
    }else{
      return <Navigate to="/login" replace/>
    }
}


export default App
