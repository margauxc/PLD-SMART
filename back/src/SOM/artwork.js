const sb = require('../SB')
const {TYPES} = require('../config')
function getArtworkById(artworkId){
    return new Promise(async (resolve,reject) => {
        const globalArtwork = await sb.artwork.findById(artworkId)
        // find appropriate DB
        const category = globalArtwork.category
        var specificArtwork = (await sb[category].findByArtworkId(artworkId)).dataValues
        resolve(adaptArtwork(specificArtwork,globalArtwork))
    })
}
function getOrInsertArtwork(data) {
    // Tries to match the data with the corresponding DB, insert it or finds its id
    return new Promise(async (resolve,reject) => {
        const category = data.category
        var resMatch = await sb[category].findExactMatch(data)
        // if there is a match, return it
        var finalArtWork = {}
        if(resMatch != null) {
            finalArtWork = resMatch.dataValues
        } else {
            // insert an artwork
            const artwork = await sb.artwork.insert(data)
            data.ArtworkId = artwork.id
            var resSpecific = await sb[category].insert(data)
            // select fields to return

            finalArtWork = resSpecific.dataValues
        }
        var result = adaptArtwork(finalArtWork, data)
        resolve(result)
    })
}
function adaptArtwork(specificArtwork, globalArtwork) {
    var fullArtwork = {...specificArtwork}
    delete fullArtwork.updatedAt
    delete fullArtwork.createdAt
    delete fullArtwork.id
    fullArtwork.category = globalArtwork.category
    fullArtwork.name = globalArtwork.name
    return fullArtwork
}

module.exports = {

    matchRequest : async (request, type) => {
        // search in artwork DB
        const resRequest = await sb.artwork.findByName(request.rawQuery || request.name)
        // if there is a match for request + type, return all the IDs
        return resRequest.map(x => x.id)
    },

    getArtwork : async (artworkId) => {
        return getArtworkById(artworkId)
    },

    getArtworkAll: async (artworkIds) => {
        return Promise.all(artworkIds.map((artworkId) => getArtworkById(artworkId)))
    },

    getOrInsert : (data) => {
        return getOrInsertArtwork(data)
    },

    getOrInsertAll : (data) => {
        return Promise.all(data.map((oneArtwork) => {
            return getOrInsertArtwork(oneArtwork)
        }))
    },
    addFreeText : (data) => {
        const finalText = {
            name : data.name,
            database : TYPES.FREETEXT,
            category : TYPES.FREETEXT,
            author : data.author,
            text : data.text
        }
        const artwork = await sb.artwork.insert(finalText)
        finalText.ArtworkId = artwork.id
        var resText = await sb[TYPES.FREETEXT].insert(finalText)
        // select fields to return

        var finalArtWork = resText.dataValues
        var result = adaptArtwork(finalArtWork, finalText)
        resolve(result)
    }   
}