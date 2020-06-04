var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var routerAuth = require('./routes/apiLogin');
var myVideos = require('./routes/apiVideos');
var bodyparser = require('body-parser');

var app = express();
// Iniciando a configuração do .env
dotenv.config();

// Conectando ao mongo passando endereço localizado no .env
mongoose.connect(process.env.BD_URL, { useUnifiedTopology: true }, function(err){
    if(err) 
        return console.log(err);
    else 
        return console.log("Conectado ao MongoDB.")
});

// Aceitando requisições json e via body e forms
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extends: true }));

// Configurando o middelware da rota de autenticação
app.use('/api/usuario',routerAuth);
// Configurando o middelwarea da rota de videos
app.use('/api',myVideos);

// Definindo a porta que o servidor vai ouvir
app.listen(3000, function(){
    console.log("Acesso ao servidor em http://localhost:3000")
});


