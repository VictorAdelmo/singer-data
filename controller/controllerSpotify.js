const configSpotify =  require("../model/configSpotify");
const metodosSpotify = require("../model/metodosSpotify");
const cantorAnalisar = require("../model/reconhecerCantor");

function callBack(req,res){
    return configSpotify.getTokenCallBack(req,res);
}

function scopesConfig (req,res){
    return configSpotify.configScopes(req,res);
}

async function pesquisarArtista(req,res){
    const pegarNomeId = await metodosSpotify.searchArtistPlaylist("Nipsey Hussle");
    const pegarInfo = await cantorAnalisar.getPersonalInformation("Nipsey Hussle");
    return res.render("musica",{id: pegarNomeId, lista: pegarInfo});
}

module.exports = {
    callBack,
    scopesConfig,
    pesquisarArtista
}

