const usuario = require('../modelos/usuario')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports= {
    crear : (req, res, next) => {
        const usuarioNuevo = {
            nombre   : req.body.nombre,
            email    : req.body.email,
            password : req.body.password
        }    
      //  console.log(usuarioNuevo)
        usuario.create(usuarioNuevo, (err, result) => {
            if (err) res.status(500).json({error: 'fallo servidor'})
            res.status(201).json(result)
        })
    },
    validar : (req, res, next) => {
        usuario.findOne({email : req.body.email}, (err, usuarioInfo)=>{
            if (err) res.status(500).json({error : 'fallo servidor'})
            if (usuarioInfo) {
                if (bcrypt.compareSync(req.body.password, usuarioInfo.password)){
                    const token = jwt.sign({id : usuarioInfo._id},
                       req.app.get('secretKey'), {expiresIn : '1h'})
                    res.json({status:"success", 
                              message: "usuario encontrado!!!", 
                              data:{user: usuarioInfo, token:token}});
                }
                else {
                    res.status(404).json({error : 'password incorrecta'})
                }
            } else {
                res.status(404).json({error : 'no existe el email'})
            }
        } )
    }
}