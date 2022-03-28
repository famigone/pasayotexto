const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Colaborativa = new Schema(
    {
      solucion: {
        type: String,
        required: true  
      },
      colaborativoId: {
       type: Schema.Types.ObjectId, 
       ref: 'Experiencia'
      },            
)

module.exports = mongoose.model('colaborativa', Colaborativa)