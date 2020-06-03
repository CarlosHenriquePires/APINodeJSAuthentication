var router = require('express').Router();
var usuarioModel = require('../models/databaseModel');
var validandoCampos = require('../validandoCampos');

// Rota para cadastro de usuário
router.post('/cadastrar', async function(req,res){

    // Receber o retorno de um erro caso haja
    var {error} = validandoCampos(req.body);
    if(error) return res.status(400).send(error.details[0].message); // Enviar o error

    // Se passar pela validação o usuário é registrado no banco de dados
    var usuario = new usuarioModel({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    });
    try {
        var salvarUsuario = await usuario.save();
        res.send(salvarUsuario);
    } catch (error) {
        res.status(400).send(error);        
    }
});

module.exports = router;