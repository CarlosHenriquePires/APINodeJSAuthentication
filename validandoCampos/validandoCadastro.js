var Joi = require('@hapi/joi');

// Definindo a configuração desejada dos campos
var validandoCamposCadastro = Joi.object({
    nome: Joi.string().required().min(4),
    email: Joi.string().required().min(6).email(),
    senha: Joi.string().required().min(6)
});

// Exporto a função para validar
module.exports = function(campos){
    return validandoCamposCadastro.validate(campos);
};