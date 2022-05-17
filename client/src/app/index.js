import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  CanalIDE  from '../components/CanalIDE'
import { NavBar } from '../components'
import { Comunidad } from '../pages'
import  Login  from '../components/Login'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
    return (
    <div style={{backgroundColor: '#FFFFFF'}}>
          <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<NavBar/>} />
                <Route path="comunidad" element={<Comunidad/>} />
                <Route path="canal/:id/:canal" element={<CanalIDE/>} />
                <Route path="login" element={<Login/>} />
            </Routes>
          </BrowserRouter>
     </div>
    )
}

export default App
