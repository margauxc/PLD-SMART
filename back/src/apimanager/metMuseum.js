// doc at https://www.npmjs.com/package/node-spotify-api
const { ErrorHandler } = require('../helpers')
const {TYPES} = require('../config')
const request = require('request-promise-native')
const Logger = require("../loaders/logger")

const API_TYPE = TYPES.MUSEUM
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
    search : async (query, type) => {
        const urlQuery = encodeURIComponent(query)
        try {
            var res = await request({
                uri:`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${urlQuery}`,
                json: true
            })
            var artworks = []
            Logger.debug(JSON.stringify(res))
            res.objectIDs.forEach(async (id, index) => {
                if(index < 5) {
                    var artwork = await request({
                        uri: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
                        json: true
                    })
                    Logger.debug(JSON.stringify(artwork))
                    artworks.push(artwork)
                }
            })
            return artworks
        } catch (err) {
            Logger.error(err)
        }
        
        // const req = https.request(options, res => {
        //     Logger.debug(JSON.stringify(res))
        //     res.on('data', d => {
        //       process.stdout.write(d)
        //     })
        //   })
        // const rawQueryTitle = query.rawQuery
        // return new Promise(async (resolve,reject) => {
        //     const data = await spotify.search({ type: 'track', query: rawQueryTitle, limit: 5 });
        //     resolve(data.tracks.items.map((track) => convertTrack(track)))
        // })
    },
}