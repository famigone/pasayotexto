const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Codesesion = new Schema(
    {
      experienciaid: {
       type: Schema.Types.ObjectId,
       ref: 'experiencia'
     },
     user:{
       type:String,
       required:true
     },
     codigo: {
       type: String,
       required: false
     },     
     observacion: {
       type: String,
       required: false
     },
     estadoObservacion: {
       type: String,
       required: false
     },     
    },    
    { timestamps: true }
)

module.exports = mongoose.model('codesesion', Codesesion)
