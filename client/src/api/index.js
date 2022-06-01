import axios from 'axios'

const api = axios.create({
  //baseURL: 'https://pasayotextoback.fi.uncoma.edu.ar/api',
  baseURL: 'http://localhost:3333/api',
})

export const insertExperiencia = payload => api.post('/experiencia', payload)
export const getAllExperiencias = (filtro) => api.get('/experiencias', {params:filtro})
export const updateExperienciaById = (id, payload) => api.put('/experiencia/${id}', payload)
export const deleteExperienciaById = id => api.delete('/experiencia/${id}')
export const getExperienciaById = id => api.get('/experiencia/'+id)
export const getLogin = () => api.get('/login')
export const postRegister = payload => api.post('/register', payload)


const apis = {
    insertExperiencia,
    getAllExperiencias  ,
    updateExperienciaById,
    deleteExperienciaById,
    getExperienciaById,
    postRegister,
    getLogin
}

export default apis
