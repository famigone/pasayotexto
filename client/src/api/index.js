import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({

  baseURL: 'https://pasayotextoback.fi.uncoma.edu.ar/api',
//  baseURL: 'http://localhost:3333/api',
})

export const insertExperiencia = payload => api.post('/experiencia', payload)
export const getAllExperiencias = (filtro) => api.get('/experiencias', {params:filtro})
export const updateExperienciaById = (id, payload) => api.put('/experiencia/${id}', payload)
export const deleteExperienciaById = id => api.delete('/experiencia/${id}')
export const getExperienciaById = id => api.get('/experiencia/'+id)
export const postLogin = payload => api.post('/user/login', payload)
export const getLogin = () => api.get('/user/')
export const getHome = () => api.get('/user/session')
export const postLogout = payload => api.post('/user/logout', payload)
export const postRegister = payload => api.post('/user/register', payload)


const apis = {
    insertExperiencia,
    getAllExperiencias,
    updateExperienciaById,
    deleteExperienciaById,
    getExperienciaById,
    postRegister,
    postLogout,
    postLogin,
    getLogin,
    getHome
}

export default apis
