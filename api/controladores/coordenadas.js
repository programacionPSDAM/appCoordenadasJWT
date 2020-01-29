const moongose = require('mongoose')

const Coordenada = require('../modelos/coordenadas')

exports.listarTodo = (req, res) => {
    Coordenada.find({}, (err, coordenadas) => {
        if (err) 
            res.status(404).send(err)
        res.json(coordenadas)
    })
}
exports.crearCoordenada = (req, res) => {
    const nuevaCoordena = new Coordenada(req.body)
    nuevaCoordena.save((err, coordenada) => {
        if (err)
            res.status(500).send(err)
        res.status(201).json(coordenada)
    })
}

exports.listarCoordenada = (req, res) => {
    Coordenada.findById(req.params.id, (err, coordenada) => {
    if (err)
        res.status(404).send(err)
    res.json(coordenada)
    })
}
exports.eliminarCoordenada = (req, res) => {
    Coordenada.findOneAndDelete({_id :req.params.id}, (err, coordenada) => {
        if (err)
            res.status(404).send(err)
        res.send(coordenada)
    })
}
exports.actualizarCoordenada = (req, res) => {
    Coordenada.updateOne({_id : req.params.id}, req.body, {new: true}, (err, coordenada) => {
        if (err)
            res.status(404).send(err)
        res.send(coordenada)
    })
}