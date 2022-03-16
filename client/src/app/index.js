import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NavBar } from '../components'
import { Ejemplos, Comunidad, Experiencia } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
    <div style={{backgroundColor: '#EEEEEE',height: '800px'}}>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/ejemplos" element={Ejemplos} />
                <Route path="/comunidad" element={Comunidad} />
                <Route path="/experiencia/:id"element={Experiencia}/>
            </Routes>
        </Router>
     </div>   
    )
}

export default App