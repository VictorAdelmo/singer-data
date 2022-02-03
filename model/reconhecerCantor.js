const { ComputerVisionClient } = require("@azure/cognitiveservices-computervision");
const  msRest  = require("@azure/ms-rest-js");
const computerVisionKey = "";
const computerVisionEndPoint = "https://famosos-api.cognitiveservices.azure.com/";
const client = new ComputerVisionClient(new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': computerVisionKey } }), computerVisionEndPoint);
const fetch = (...args) =>
import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

async function reconhecerArtista(req,res,img) {
return new Promise((resolve, rejected) => {
   try{
    client
    .describeImageInStream(img)
    .then((result) => {
        console.log("The result is:");
        console.log(result);
        let json = "";
        json = JSON.stringify(result);
        json = JSON.parse(json);
        let nome = pegarNome(json.captions[0].text);
        resolve(nome);
    })
    .catch((err) => {
      rejected(console.log("An error occurred:" + err));
    });
}catch(err){
    console.log(err);
}
})
}

async function pegarInformacoesArtista(req,res,artista){
    return new Promise(async(resolve,rejected) => {
        try{

        let resultado = await fetch(`https://api.celebrityninjas.com/v1/search?limit=10&name=${artista}`,
        {method: "GET", headers: {"X-Api-Key" : process.env.NINJAS_API_KEY}}).then((res) => res.json());
        if(resultado[0] != null){
            resultado = JSON.stringify(resultado, null, 2);
            resultado = JSON.parse(resultado);
            let item = pegarItemArtista(resultado,artista);
            item = JSON.stringify(item);
            item = JSON.parse(item);
            console.log(item);
            resolve(item);
        }else{
            resolve(null);
        }

        }catch(err){
            rejected(console.log(err));
        }
    })
}

function pegarItemArtista(json,artista){
    let obj = json.filter(item => item.name == artista);
    return obj[0];   
}

function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

function pegarPrimeiroNome(texto) {
    const words = texto.split(' ').slice(0,1);
    return words[0] + "";
}

function pegarPrimeiraLetra(str) {
    const firstLetters = str
        .split(' ')
        .map(word => word[0])
        .join('');
    return firstLetters;
}

function pegarNome(texto) {
    const words = texto.split(' ').slice(0,2);
    let primeiraPalavraLetra = getFirstLetters(words[0]);
    let segundaPalavraLetra = getFirstLetters(words[1]);

    if(primeiraPalavraLetra == primeiraPalavraLetra.toUpperCase() 
    && segundaPalavraLetra == segundaPalavraLetra.toUpperCase()){
        let juntar = words[0] + " " + words[1]
        return juntar;
    }else if(primeiraPalavraLetra == primeiraPalavraLetra.toUpperCase()){
        return words[0];
    }
}

module.exports = {
    pegarInformacoesArtista
}