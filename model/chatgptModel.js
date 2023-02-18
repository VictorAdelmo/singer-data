const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
const openai = new OpenAIApi(configuration);

async function makeBiography(artist) {
    return new Promise(async(resolve,rejected) => {
    try {
        let completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Make a biography of the celebrity named " + artist,
        max_tokens: 100,
        temperature: 0,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      let answer = completion.data.choices[0].text;
      answer = JSON.stringify(answer);
      answer = JSON.parse(answer);
      answer = answer.replace(/\n/g, '');
      
      console.log(answer)
      resolve(answer);

    }catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
          resolve("");
        } else {
          console.log(error.message);
          resolve("");
        }
    }
});
}

module.exports ={
    makeBiography
} 
