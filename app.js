var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var routerAuth = require('./routes/authentication');
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

// Configurando a rota
app.use('/api/usuario',routerAuth);

// Definindo a porta que o servidor vai ouvir
app.listen(3000, function(){
    console.log("Acesso ao servidor em http://localhost:3000")
});


