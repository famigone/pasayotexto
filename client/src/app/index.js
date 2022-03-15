import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NavBar } from '../components'
import { MoviesList, MoviesInsert, MoviesUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
    <div style={{backgroundColor: '#EEEEEE',height: '800px'}}>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/experiencias" element={<MoviesList/>} />
                <Route path="/experiencias/create" element={MoviesInsert} />
                <Route path="/movies/update/:id"element={MoviesUpdate}/>
            </Routes>
        </Router>
     </div>   
    )
}

export default App