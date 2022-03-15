import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertExperiencia = payload => api.post(`/experiencia`, payload)
export const getAllExperiencias = () => api.get(`/experiencias`)
export const updateExperienciaById = (id, payload) => api.put(`/experiencia/${id}`, payload)
export const deleteExperienciaById = id => api.delete(`/experiencia/${id}`)
export const getExperienciaById = id => api.get(`/experiencia/${id}`)

const apis = {
    insertExperiencia,
    getAllExperiencia,
    updateExperienciaById,
    deleteExperienciaById,
    getExperienciaById,
}

export default apis