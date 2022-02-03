const { RecognizeCelebritiesCommand } = require("@aws-sdk/client-rekognition");
const { RekognitionClient } = require("@aws-sdk/client-rekognition");
const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1" ,
}
const rekogClient = new RekognitionClient({ region: "us-east-1" });

const recognize_celebrity = async (req, res, img) => {
    return new Promise(async(resolve, rejected) => {

    const params = {
    Image: {
      Bytes: img,
    },
  };

  try {
    const response = await rekogClient.send(
      new RecognizeCelebritiesCommand(params));
      response.CelebrityFaces.forEach((celebrity) => {

        if(celebrity.Name != null){
          console.log(`Name: ${celebrity.Name}`);
          resolve(celebrity.Name);
        }else{
          console.log("Nao Reconhecido");
          resolve(null);
        }
    }); 
  } catch (err) {
    rejected(console.log("Error", err));
  }
});
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
  recognize_celebrity,
};
