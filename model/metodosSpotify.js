const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_PUBLIC_CLIENT,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
});

spotifyApi.clientCredentialsGrant().then(
  function(data) {
    const access_token = data.body['access_token'];
    const refresh_token = data.body['refresh_token']
    const expires_in = data.body['expires_in'];
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    setInterval(async () => {
      const data2 = await spotifyApi.refreshAccessToken();
      console.log('The access token has been refreshed!');
      console.log('access_token:', data2.body['access_token']);
      spotifyApi.setAccessToken(data2.body['access_token']);
    }, expires_in / 2 * 5000);

})

const searchArtistPlaylist= (artista) => {
  return new Promise((resolve, rejected) => {
    try {
      spotifyApi.searchArtists("artist:" + artista).then(
          function (data){
            let resultado = "";
            resultado = JSON.stringify(data.body, null, 2);
            resultado = JSON.parse(resultado);

            if(resultado.artists.items[0]!= null){
            let idArtista = resultado.artists.items[0].id;
              resolve (idArtista);
            }else{
              resolve("");
            }
          }
      );
    } catch (err) {
      rejected (console.log(err));
    }
  });
};

const pesquisarSonsPopularesArtista = (req, res, id) => {
  spotifyApi.getArtistTopTracks(id, "GB").then(
    function (data) {
      return res.send(data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
};
module.exports = { searchArtistPlaylist, pesquisarSonsPopularesArtista };
