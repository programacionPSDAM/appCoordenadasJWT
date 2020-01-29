const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    nombre : {
        type: String, 
        required: true,
        trim : true
    },
    email : {
        type: String, 
        required: true,
        trim : true,
        unique: true,
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, 
                'email incorrecto']
    },
    password : {
        type: String, 
        required: true,
        trim : true
    }

    
}, {versionKey : false})

usuarioSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
})

module.exports=mongoose.model('Usuario', usuarioSchema)