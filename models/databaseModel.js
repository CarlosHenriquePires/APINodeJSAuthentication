var mongoose = require('mongoose');

// Definindo o schema do banco
var usuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
        max: 255,
        min: 4
    },    
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    senha: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
});

module.exports = mongoose.model('usuarioSchema',usuarioSchema);;