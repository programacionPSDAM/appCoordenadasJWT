const express = require('express')
const router  = express.Router()
const usuarioControlador = require ('../controladores/usuario')
router.post('/registro', usuarioControlador.crear)
router.post('/autenticar', usuarioControlador.validar)

module.exports=router