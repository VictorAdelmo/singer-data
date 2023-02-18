const SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_PUBLIC_CLIENT,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

const scopes = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-playback-position",
];

function loginSpotify(req, res) {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
}

function callBack(req, res) {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error("Callback Error:", error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const access_token = data.body["access_token"];
      const refresh_token = data.body["refresh_token"];
      const expires_in = data.body["expires_in"];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log("access_token:", access_token);
      console.log("refresh_token:", refresh_token);

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body["access_token"];

        console.log("The access token has been refreshed!");
        console.log("access_token:", access_token);
        spotifyApi.setAccessToken(access_token);
      }, (expires_in / 2) * 1000);
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send(`Error getting Tokens: ${error}`);
    });
}

async function searchArtistPlaylist(artista) {
  return new Promise((resolve, rejected) => {
    try {
      spotifyApi.searchArtists("artist:" + artista).then(function (data) {
        let resultado = "";
        resultado = JSON.stringify(data.body, null, 2);
        resultado = JSON.parse(resultado);

        if (resultado.artists.items[0] != null) {
          let idArtista = resultado.artists.items[0].id;
          resolve(idArtista);
        } else {
          resolve("");
        }
      });
    } catch (err) {
      rejected(console.log(err));
    }
  });
}

module.exports = {
  callBack,
  loginSpotify,
  searchArtistPlaylist
};
