import React, { Component, useState, useEffect } from 'react'
import { Navigate, BrowserRouter, Route, Routes, Outlet, Link, useNavigate, useLocation } from 'react-router-dom'

import  CanalIDE  from '../components/CanalIDE'
import  NavBara  from '../components/NavBara'
import  BarraEstado  from '../components/BarraEstado'
import { Comunidad } from '../pages'
import  Login  from '../components/Login'
import  Register  from '../components/Register'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios'
import api from '../api'

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

                <Route path="comunidad" element={<RequireAuth1 user={user}/>}>
                  <Route path="" element={<Comunidad user={user}/>} />
                </Route>
                <Route
                  path="canal/:id/:canal"
                  element={
                        <RequireAuth>
                            <CanalIDE />
                        </RequireAuth>
                    }
                />
                <Route path="login" element={<Login actualizarUsuario={actualizarUsuario}/>} />
                <Route path="register" element={<Register/>} />
            </Routes>
          </BrowserRouter>
    )
}


function RequireAuth1({user}) {
    if (user) {
      return <Outlet />
    }else{
      return <Navigate to="/login" replace/>
    }
}


function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  //console.log("location "+location)
  if (auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const useAuth = async() => {
  try {
  // const response = await get("/api/experiencias", {params:filtro});
    const response = await api.getHome()
    //setUser(user);
    console.log("en router auth es: "+ response.data.user )
    return response.data.user;
  } catch(error) {
    console.log('error 666 ', error);
  }
}



export default App
