const fetch = (...args) =>
import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

async function getPersonalInformation(artista){
    return new Promise(async(resolve,rejected) => {
        try{
        let resultado = await fetch(`https://api.api-ninjas.com/v1/celebrity?limit=1&name=${artista}`,
        {method: "GET", headers: {"X-Api-Key" : process.env.NINJAS_API_KEY}}).then((res) => res.json());

        if(resultado[0] != null){
            resultado = JSON.stringify(resultado, null, 2);
            resultado = JSON.parse(resultado);
            resolve(resultado);
        }else{
            resolve(null);
        }

        }catch(err){
            console.log(err)
            rejected(null);
        }
    })
}

function pegarItemArtista(json,artista){
    let obj = json.filter(item => item.name == artista);
    obj = JSON.stringify(obj[0])
    return obj;   
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
    getPersonalInformation
}