const cantorAnalisar = require("../model/reconhecerCantor");
const spotifyMetodos = require("../model/metodosSpotify");
const aws = require("../model/amazonReconhcer");

async function analisarCantor(req,res,img) {
    try{
    const awsNome = await aws.recognize_celebrity(req,res,img);
    
    if(awsNome != null){
        let spotify = await spotifyMetodos.pesquisarArtista(req,res,awsNome);
        let informacoes = await cantorAnalisar.pegarInformacoesArtista(req,res,awsNome);

        if(spotify != null && informacoes != null){
            return res.render("musica",{id: spotify, lista: informacoes});
        }else if(spotify != null) {
            return res.render("musica",{id: spotify, msgError: "Não foi Possivel Achar as Informações do Cantor"});
        }else if (informacoes != null){
            return res.render("musica",{id:spotify, lista: informacoes, msgError: "Não Foi Possivel Encotrar a Playlist do Cantor"});
        }
    }else {
        spotify = await spotifyMetodos.pesquisarArtista(req,res,"Nipsey Hussle");
        informacoes = await cantorAnalisar.pegarInformacoesArtista(req,res,"Nipsey Hussle");
        return res.render("musica",{id: spotify, lista: informacoes, msgError: "Não Foi Possivel Reconhecer Esse Cantor"});
    }
    
}catch(err){
    console.log(err);
}
}



function pegarPrimeiroNome(texto) {
    var wordsArray = texto.split(" ");
    var result = wordsArray[0];
    return result;
}

module.exports = {
    analisarCantor
}