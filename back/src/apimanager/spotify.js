// doc at https://www.npmjs.com/package/node-spotify-api
const { ErrorHandler } = require('../helpers')
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});
const API_TYPE = "music"
function convertTrack (track) {
    var resTrack = {}
    // artwork fields
    resTrack.name = track.name
    resTrack.database = "spotify"
    resTrack.category = API_TYPE

    // music fields
    resTrack.url = track.uri
    resTrack.artist = track.artists[0].name
    resTrack.album = track.album.name
    return resTrack
}

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