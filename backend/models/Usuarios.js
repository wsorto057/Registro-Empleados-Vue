const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema= new Schema({

    nombre: {
        type: String,
        required: true,
        trin: true
    },
    email: {
        type: String,
        unique: true, 
        lowercase: true,
        trim: true
    }, 
    password:{
        type: String, 
        required: true
    },
    rol:{
        type:String,
        required: true,
        trin: true
    }
});

module.exports= mongoose.model('Usuarios', usuarioSchema);