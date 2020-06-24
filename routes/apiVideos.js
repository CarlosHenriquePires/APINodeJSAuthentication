var router = require('express').Router();
var validarToken = require('./validarToken');

// Api de videos, se passar pela validação do token terá acesso
router.get('/myVideos',validarToken ,function(req,res){
    
    var myVideosData =[
    {
        titulo:'lofi hip hop radio - beats to relax/study to',
        descricao:'Música 24/7 para estudo',
        categoria:'Música para Estudo',
        link:'https://www.youtube.com/embed/5qap5aO4i9A'
    },
    {
        titulo:'Chillhop Radio - jazzy & lofi hip hop beats',
        descricao:'Música 24/7 para estudo',
        categoria:'Música para Estudo',
        link:'https://www.youtube.com/embed/5yx6BWlEVcY'
    },
    {
        titulo:'lofi hip hop radio - beats to sleep/chill to',
        descricao:'Música 24/7 para estudo',
        categoria:'Música para Estudo',
        link:'https://www.youtube.com/embed/DWcJFNfaw9c'
    },


];

    // Retorna um json 
    res.send(myVideosData);
});

module.exports = router;