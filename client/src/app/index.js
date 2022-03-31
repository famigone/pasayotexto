import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { NavBar } from '../components'
import { Comunidad } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


function App() {
    return (
    <div style={{backgroundColor: '#FFFFFF'}}>
          <BrowserRouter>
            <NavBar/>

            <Routes>                
                <Route path="/" element={<NavBar/>} />            
                <Route path="comunidad" element={<Comunidad/>} />            
            </Routes>
            
          </BrowserRouter>
     </div>   
    )
}

export default App