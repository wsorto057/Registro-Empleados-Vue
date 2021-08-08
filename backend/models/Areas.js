const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const areasSchema = new Schema({
    nombre: {type: String, maxlengt:60, unique:true, require: true, trim: true},
    descripcion: {type: String, maxlengt:255, trim: true},
   // estado: {type: Number, default:1},
    createdAt: {type: Date, Default:Date.now}
});

module.exports= mongoose.model('Areas', areasSchema);