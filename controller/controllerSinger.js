const celebrityInformations = require("../model/reconhecerCantor");
const spotify = require("../model/metodosSpotify");
const aws = require("../model/amazonRecogition");
const chatgpt = require("../model/chatgptModel");

async function analyzeSinger(req,res) {
    const img = req.body.img;

    if(!img) {
        return res.status(500).send({});
    }

    const imgBase64ToBytes = Buffer.from(img, "base64");

    const celebrityName = await aws.recognize_celebrity(imgBase64ToBytes);

    if(celebrityName != null){
        const spotifyPlaylistKey = await spotify.searchArtistPlaylist(celebrityName);
        let personalInformations = await celebrityInformations.getPersonalInformation(celebrityName);
        const biography = await chatgpt.makeBiography(celebrityName);

        if(personalInformations == null){
            personalInformations = [];
        }

        if(spotifyPlaylistKey != null || personalInformations != null || biography != null){
            return res.status(200).send({
                artistName: celebrityName,
                playListKey: spotifyPlaylistKey,
                personalInfos: personalInformations,
                artistBiography: biography});
        }else {
            return res.status(300).send({});
        }
    }else {
        return res.status(300).send({});
    }
}

module.exports = {
    analyzeSinger
}