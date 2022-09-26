const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Trayecto = new Schema(
    {
      titulo: {
        type: String,
        required: true
      },
      narrativa: {
        type: String,
        required: true
      },
      tema: {
        type: String,
        required: true
      },
      objetivo: {
        type: String,
        required: true
      },
      activo: {
        type: Boolean,
        required: true
      }, //borrado lógico
      user:{
        type:String,
        required:true
      },
      experiencias: [{
        type: Schema.Types.ObjectId,
        ref: "Experiencia",
        required: false
      }],
    },
    { timestamps: true },
)

module.exports = mongoose.model('trayecto', Trayecto)
