import React, { Component, useState, useEffect } from 'react'
import { Navigate, BrowserRouter, Route, Routes, Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { createContext, useContext, useMemo } from "react";
import AuthService from "../services/auth.service";
//import { useLocalStorage } from "./useLocalStorage";

import  UserContext   from '../components/UserContext';
import  UserProvider  from '../components/UserProvider';
import  CanalIDE  from '../components/CanalIDE'
import  NavBara  from '../components/NavBara'
import  BarraEstado  from '../components/BarraEstado'
import  Comunidad  from '../pages/Comunidad'
import  Comunidad1  from '../pages/Comunidad1'
import  Login  from '../components/Login'
import  Register  from '../components/Register'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios'
import api from '../api'

const App = () => {
    //const { user } = useContext(UserContext);
    const [currentUser, setCurrentUser] = useState(undefined)
    //const [user, setUser] = useState(null)
    //console.log("usuarioOriginal: "+user)

    useEffect(function() {
      const user = AuthService.getCurrentUser();
      if (user) {
      setCurrentUser(user.username)
        console.log("seteo ",user.username)
      }
    }, []);


//console.log("AuthService.getCurrentUser() ",AuthService.getCurrentUser())
    return (
          <BrowserRouter>
           <UserProvider>
            <BarraEstado currentUser={currentUser} setCurrentUser={setCurrentUser} />
            <Routes>
              <Route
                path="comunidad"
                element={
                      <RequireAuth>
                          <Comunidad1 />
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
                <Route path="login" element={<Login setCurrentUser={setCurrentUser}/>} />
                <Route path="register" element={<Register/>} />
            </Routes>
          </UserProvider>
          </BrowserRouter>
    )
}




function RequireAuth({ children }) {
  let location = useLocation();
  //const { user } = useContext(UserContext);
  //console.log("location: ", location)
  const user = AuthService.getCurrentUser();
    if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  //console.log("children ", children)
  return children;
}





export default App
