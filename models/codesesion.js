const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Codesesion = new Schema(
    {
      experienciaid: {
       type: Schema.Types.ObjectId,
       ref: 'Experiencia'
     },
     user:{
       type:String,
       required:true
     },
     codigo: {
       type: String,
       required: false
     },
    }
)

module.exports = mongoose.model('codesesion', Codesesion)
