const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

  const {URLSearchParams} = require('url');
  const data = new URLSearchParams();

require("dotenv").config();

async function getArtist(artist) {
  return new Promise(async (resolve, rejected) => {
    const token = await getAccessToken();
    if (token != null) {
      let response = await fetch(
        `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      ).then((res) => res.json());

      if(response.artists.items[0]!= null){
        const idArtista = response.artists.items[0].id;
          resolve(idArtista);
        }else{
          resolve("");
        }
    }else {
      resolve("");
    }
  });
}

async function getAccessToken() {
  return new Promise(async (resolve, rejected) => {

    data.append('grant_type', "client_credentials");

    let response = await fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(
            process.env.SPOTIFY_PUBLIC_CLIENT +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    }).then((res) => res.json());

    if(response.access_token != null){
      var token = response.access_token;
      resolve(token);
    }else {
      resolve (null);
    }


  });
}

module.exports = {getArtist}
