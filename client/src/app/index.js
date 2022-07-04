import React, { Component, useState, useEffect } from 'react'
import { Navigate, BrowserRouter, Route, Routes, Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { createContext, useContext, useMemo } from "react";
//import { useLocalStorage } from "./useLocalStorage";

import  UserContext   from '../components/UserContext';
import  UserProvider  from '../components/UserProvider';
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
    const { user } = useContext(UserContext);
    //const [user, setUser] = useState(null)
    //console.log("usuarioOriginal: "+user)
    const actualizarUsuario = (usuario) => {
      //setUser(usuario)
    //  console.log("actualizó el usuario " + user)
    }
    return (
          <BrowserRouter>
           <UserProvider>
            <BarraEstado/>
            <Routes>
              <Route
                path="comunidad"
                element={
                      <RequireAuth>
                          <Comunidad />
                      </RequireAuth>
                  }
              />
                <Route
                  path="canal/:id/:canal/:useroriginal"
                  element={
                        <RequireAuth>
                            <CanalIDE/>
                        </RequireAuth>
                    }
                />
              //<Route path="canalsecret/:id/:canal" element={<CanalIDE />} />
                <Route path="login" element={<Login/>} />
                <Route path="register" element={<Register/>} />
            </Routes>
          </UserProvider>
          </BrowserRouter>
    )
}




function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const { user } = useContext(UserContext);
  //console.log("location "+location)
  if (!user.auth) {
    console.log("no autenticado "+location)
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  console.log("sisisisi autenticado "+children)
  return children;
}





export default App
