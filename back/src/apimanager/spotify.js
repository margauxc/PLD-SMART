// doc at https://www.npmjs.com/package/node-spotify-api
const { ErrorHandler } = require('../helpers')
const {TYPES} = require('../config')
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});
const API_TYPE = TYPES.MUSIC
function convertTrack (track) {
    var resTrack = {}
    // artwork fields
    resTrack.name = track.name
    resTrack.database = "spotify"
    resTrack.category = API_TYPE
    resTrack.pictureLink = track.album.images[0].url
    resTrack.date = track.album.release_date
    // music fields
    resTrack.url = track.uri
    resTrack.artist = track.artists[0].name
    resTrack.album = track.album.name
    return resTrack
}
/*
Recherche : titre, artiste
Detail : image pochette, album, titre, artiste, année, extrait
*/

module.exports = {
    type : API_TYPE,
    getTrack : (id) => {
        return new Promise((resolve,reject) => {
            spotify
                .request('https://api.spotify.com/v1/tracks/'+id)
                .then((data) => {
                    console.log(data)
                    //TODO read and select
                    resolve(data)
                })
        })
    },
    search : (query, type) => {
        // TODO get all fields of the query
        const rawQueryTitle = query.rawQuery
        return new Promise(async (resolve,reject) => {
            const data = await spotify.search({ type: 'track', query: rawQueryTitle, limit: 5 });
            resolve(data.tracks.items.map((track) => convertTrack(track)))
        })
    },
}