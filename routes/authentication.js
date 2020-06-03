var router = require('express').Router();
var usuarioModel = require('../models/databaseModel');
var validandoCadastro = require('../validandoCampos/validandoCadastro');

// Rota para cadastro de usuário
router.post('/cadastrar', async function(req,res){

    // Receber o retorno de um erro caso haja
    var {error} = validandoCadastro(req.body);
    if(error) return res.status(400).send(error.details[0].message); // Enviar o error

      // Verificando se o e-mail já existe
    var emailExiste = await usuarioModel.findOne({email: req.body.email});
    if(emailExiste) return res.status(400).send("E-mail já existe!");

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

// Rota para login do usuário
router.post('/login', async function(req,res){

    // Receber o retorno de um erro caso haja
    var {error} = validandoCadastro(req.body);
    if(error) return res.status(400).send(error.details[0].message); // Enviar o error

    // Verificando se o e-mail não existe
    var emailExiste = await usuarioModel.findOne({email: req.body.email});
    if(!emailExiste) return res.status(400).send("E-mail ou senha incorreta!");

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