const sb = require('../SB')
function getArtworkById(artworkId){
    return new Promise(async (resolve,reject) => {
        const resArtwork = await sb.artwork.findById(artworkId)
        // find appropriate DB
        const category = resArtwork.category
        var fullArtwork = await sb[category].findByArtworkId(artworkId)
        fullArtwork = fullArtwork.dataValues
        fullArtwork.category = resArtwork.category
        resolve(fullArtwork)
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
function adaptArtwork(artwork, data) {
    delete artwork.updatedAt
    delete artwork.createdAt
    artwork.category = data.category
    artwork.name = data.name
    return artwork
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
    }
}