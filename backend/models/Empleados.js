const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const empleadosSchema = new Schema({

    nombres: {type: String, maxlengt:60, require: true, trim: true},
    apellidos: {type: String, maxlengt:60, require: true, trim: true},
    tipo_documento: {type: String, maxlengt:20},
    numero_documento: {type: String, maxlengt:10, trim: true},
    telefono: {type: String, maxlengt:10, trim: true},
    email: {type: String, maxlengt:60, unique:true, lowercase: true, trim: true},
    cargo: {type: String, maxlengt:60, trim: true},
    area: {type: String, maxlengt:60, },
    subarea: {type: String, maxlengt:60},
    createdAt: {type: Date, Default:Date.now}



});



module.exports= mongoose.model('Empleados', empleadosSchema);