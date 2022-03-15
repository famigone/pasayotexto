const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Experiencia = new Schema(
    {
      xml: {
        type: String,
        required: true  
      },
      narrativa: {
        type: String,
        required: true  
      },
      categoria: {
        type: String,
        required: true  
      },       
      objetivo: {
        type: String,
        required: true  
      },
      activo: {
        type: Boolean
      }, //borrado lógico
    },
    { timestamps: true },
)

module.exports = mongoose.model('experiencia', Experiencia)