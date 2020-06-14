var jwt = require("jsonwebtoken");

module.exports = function auth(req,res,next){
    // Verificando se o auth-token foi passado via header
    var token = req.header("auth-token");
    if(!token) return res.status(401).send('Acesso Negado!'); // Se não foi passado ele nega o acesso

    // Verificando se o auth-token é válido
    var verificando = jwt.verify(token,process.env.TOKEN_SECRET);
    if(!verificando) return res.status(400).send("Token inválido!");

    next();

};