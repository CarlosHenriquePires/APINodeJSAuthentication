var router = require('express').Router();
var usuarioModel = require('../models/databaseModel');
var validandoCadastro = require('../validandoCampos/validandoCadastro');
var validandoLogin = require('../validandoCampos/validandoLogin');
var bcrypt = require('bcrypt');

// Rota para cadastro de usuário
router.post('/cadastrar', async function(req,res){

    // Receber o retorno de um erro caso haja
    var {error} = validandoCadastro(req.body);
    if(error) return res.status(400).send(error.details[0].message); // Enviar o error

      // Verificando se o e-mail já existe
    var emailExiste = await usuarioModel.findOne({email: req.body.email});
    if(emailExiste) return res.status(400).send("E-mail já existe!");

    // Criando o hash da senha
    var salt = await bcrypt.genSalt(10);
    var senhaHash = await bcrypt.hash(req.body.senha, salt);
    

    // Se passar pela validação o usuário é registrado no banco de dados com senha encriptada
    var usuario = new usuarioModel({
        nome: req.body.nome,
        email: req.body.email,
        senha: senhaHash
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
    var {error} = validandoLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message); // Enviar o error

    // Verificando se o usuário não existe
    var usuarioExiste = await usuarioModel.findOne({email: req.body.email});
    if(!usuarioExiste) return res.status(400).send("E-mail ou senha incorreta!");

    // Comparar a senha com o hash
    var compararSenha = await bcrypt.compare(req.body.senha, usuarioExiste.senha);
    if(!compararSenha) return res.status(400).send("E-mail ou senha incorreta!");

    res.send("Usuário Logado com Sucesso!");


});

module.exports = router;