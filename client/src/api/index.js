import authHeader from '../services/auth-header';
import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.headers.common = { headers: authHeader() }
const api = axios.create({
//  baseURL: 'https://pasayotextoback.fi.uncoma.edu.ar/api',
  baseURL: 'http://localhost:3333/api',
  headers: {
        'x-access-token': authHeader()
      }
})

//trayectos
export const insertTrayecto = payload => api.post('/trayecto', payload)
export const getAllTrayectos = (filtro) => api.get('/trayectos', {params:filtro})
export const updateTrayectoById = (id, payload) => api.put('/trayecto/'+id, payload)
export const deleteTrayectoById = id => api.delete('/trayecto/'+id)
export const getTrayectoById = id => api.get('/trayecto/'+id)

//exp
export const insertExperiencia = payload => api.post('/experiencia', payload)
export const getAllExperiencias = (filtro) => api.get('/experiencias', {params:filtro})
export const updateExperienciaById = (id, payload) => api.put('/experiencia/'+id, payload)
export const deleteExperienciaById = id => api.delete('/experiencia/'+id)
export const getExperienciaById = id => api.get('/experiencia/'+id)
export const getExperienciaTrayectoById = id => api.get('/experiencia/trayecto/'+id)

//Codesesions
export const getCodesesionByUser = (filtro) => api.get('/codesesion/', {params:filtro})
export const getAllCodesesion = (filtro) => api.get('/allcodesesion/', {params:filtro})
export const insertCodesesion = payload => api.post('/codesesion/', payload)
export const updateCodesesionById = (id, payload) => api.put('/codesesion/'+id, payload)

//user
export const postLogin = payload => api.post('/user/login', payload)
export const getLogin = () => api.get('/user/')
export const getAllUser = () => api.get('/user/users')
export const getAuth = () => api.get('/user/auth')
export const getHome = () => api.get('/user/session')
export const postLogout = payload => api.post('/user/logout', payload)
export const postRegister = payload => api.post('/user/register', payload)


const apis = {
    insertTrayecto,
    insertExperiencia,
    insertCodesesion,
    getAllTrayectos,
    updateCodesesionById,
    getAllExperiencias,
    updateExperienciaById,
    deleteExperienciaById,
    getExperienciaById,
    getExperienciaTrayectoById,
    postRegister,
    postLogout,
    postLogin,
    getLogin,
    getHome,
    getCodesesionByUser,
    getAuth,
    getAllUser,
    getAllCodesesion,
}

export default apis
