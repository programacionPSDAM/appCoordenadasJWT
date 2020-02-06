const express = require('express')
const bodyParser = require('body-parser')
const usuario = require('./api/rutas/usuario')
const coordenadas = require('./api/rutas/coordenadas')
const mongoose = require('mongoose')
var jwt = require('jsonwebtoken');
const app = express()
//variables
app.set('secretKey', 'valorVariable');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongodb:27017/ejemplo', 
{ useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.json({server : "ok"})
})

//middleware
app.use(bodyParser.json())

//registramos las rutas
app.use('/usuarios', usuario)
app.use('/coordenadas',validateUser, coordenadas)


//validacion del token
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
    
  }

const port = process.env.PORT || 5555

const server = app.listen(port, () => {
    const address = server.address().address
    console.log(`Servidor abierto en http://${address}:${port}`)
})