const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Trayecto = require('./trayecto');

const Experiencia = new Schema(
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
      plantilla: {
        type: String,
        required: false
      },
      solucion: {
        type: String,
        required: false
      },
      trayectoid: {
        type: Schema.Types.ObjectId,
        ref: "Trayecto",
        required: false
      },
    },
    { timestamps: true },
)


Experiencia.virtual('trayecto', {
  ref: 'trayecto',
  localField: 'trayectoid',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('experiencia', Experiencia)
