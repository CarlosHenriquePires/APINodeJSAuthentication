var router = require('express').Router();
var validarToken = require('./validarToken');

// Api de videos, se passar pela validação do token terá acesso
router.get('/myVideos',validarToken ,function(req,res){
    
    var myVideosData =
    {
        titulo:'lofi hip hop radio - beats to relax/study to',
        descricao:'Música 24/7 para estudo',
        categoria:'Música para Estudo',
        link:'https://www.youtube.com/watch?v=5qap5aO4i9A'
    };

    // Retorna um json 
    res.send(myVideosData);
});

module.exports = router;