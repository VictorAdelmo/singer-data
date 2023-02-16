const { RecognizeCelebritiesCommand } = require("@aws-sdk/client-rekognition");
const { RekognitionClient } = require("@aws-sdk/client-rekognition");
const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
};
const rekogClient = new RekognitionClient({ region: "us-east-1" });

const recognize_celebrity = async (img) => {
  return new Promise(async (resolve, rejected) => {
    const params = {
      Image: {
        Bytes: img,
      },
    };

    try {
      const response = await rekogClient.send(
        new RecognizeCelebritiesCommand(params)
      );
   
      if(response.CelebrityFaces.length > 0){
      response.CelebrityFaces.forEach((celebrity) => {
        if (celebrity.Name != null) {
          console.log(`Name: ${celebrity.Name}`);
          resolve(celebrity.Name);
        } else {
          resolve(null);
        }
      });
    }else {
      resolve(null);
    }
    } catch (err) {
      console.log("erro catch")
      console.log(err);
      resolve(null);
    }
  });
};

module.exports = {
  recognize_celebrity,
};
