const express = require('express')
const router  = express.Router()
const coordenasControlador = require('../controladores/coordenadas')

    router.route('/')
       .get(coordenasControlador.listarTodo)
       .post(coordenasControlador.crearCoordenada)

    router.route('/:id')
        .get(coordenasControlador.listarCoordenada)
        .delete(coordenasControlador.eliminarCoordenada)
        .put(coordenasControlador.actualizarCoordenada)

module.exports=router