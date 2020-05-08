// doc at https://www.npmjs.com/package/node-spotify-api
const { ErrorHandler } = require('../helpers')
const {TYPES} = require('../config')
const request = require('request-promise-native')
const Logger = require("../loaders/logger")

const API_TYPE = TYPES.MUSEUM
function convert (artwork) {
    var res = {}
    // artwork fields
    res.name = artwork.title
    res.database = "metMuseum"
    res.category = API_TYPE
    res.pictureLink = artwork.primaryImageSmall
    res.date = artwork.accessionYear+'-01-01'
    // museum fields
    res.medium = artwork.medium
    res.url = artwork.objectURL
    res.artist = artwork.artistDisplayName
    res.classification = artwork.classification

    return res
}
/*
Recherche : titre, artiste
Detail : image pochette, album, titre, artiste, année, extrait
*/

module.exports = {
    type : API_TYPE,

    search : async (query) => {
        var {rawQuery, artist, category} = query
        // TODO corriger mais pas utile pour l'instant
        // if (category && category != TYPES.MUSEUM) {
        //     rawQuery += ` ${encodeURIComponent(category)}`
        // }
        // if (artist) {
        //     rawQuery += ` ${encodeURIComponent(artist)}`            
        // }
        const uri = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(rawQuery)}`
        try {
            var res = await request({
                uri: uri,
                json: true
            })

            if (res.objectIDs) {
                artworks = await Promise.all(res.objectIDs.slice(0,5).map((id,index) => {
                    return request({
                        uri: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
                        json: true
                    })
                }))
                return artworks.map(artwork => convert(artwork))
            } else {
                return []
            }
        } catch (err) {
            Logger.error(err)
        }
    },
}