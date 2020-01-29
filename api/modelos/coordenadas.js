const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CoordenadaSchema = new Schema({
  ciudad: {
    type: String,
    required: true
  },
  pais: {
    type: String,
    required: true
  },
  zonaHoraria: {
    type: String,
    required: true
  },
  latitud: {
    type: Number,
    max: 90,
    min: -90,
    default: 0
  },
  longitud: {
    type: Number,
    max: 180,
    min: -180,
    default: 0
  },
}, {versionKey : false});

module.exports = mongoose.model('Coordenadas', CoordenadaSchema)