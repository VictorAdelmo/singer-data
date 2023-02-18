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
            console.log(resultado)
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

module.exports = {
    getPersonalInformation
}