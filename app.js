var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var apiLogin = require('./routes/apiLogin');
var apiVideos = require('./routes/apiVideos');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();
// Iniciando a configuração do .env
dotenv.config();

// Conectando ao mongo passando endereço localizado no .env
mongoose.connect(process.env.BD_URL, { useUnifiedTopology: true, useNewUrlParser: true }, function(err){
    if(err) 
        return console.log(err);
    else 
        return console.log("Conectado ao MongoDB.")
});

// Aceitando requisições json e via body e forms
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({}));

//Habilitando o CORS
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

// Configurando o middleware da rota de autenticação
app.use('/api/usuario',apiLogin);
// Configurando o middleware da rota de videos
app.use('/api',apiVideos);

// Definindo a porta que o servidor vai ouvir
app.listen(3000, function(){
    console.log("Acesso ao servidor em http://localhost:3000")
});


