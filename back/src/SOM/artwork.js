const sb = require('../SB')
const type = "music"
function getArtworkById(artworkId){
    return new Promise(async (resolve,reject) => {
        const resArtwork = await sb.artwork.findById(artworkId)
        // find appropriate DB
        const category = resArtwork.category
        const fullArtwork = await sb[category].findByArtworkId(artworkId)
        fullArtwork.type = resArtwork.category
        resolve(fullArtwork)
    })
}
function getOrInsertArtwork(data) {
    // Tries to match the data with the corresponding DB, insert it or finds its id
    return new Promise(async (resolve,reject) => {
        const category = data.category
        const resMatch = await sb[category].findExactMatch(data)
        // if there is a match, return it
        if(resMatch != null) {
            resMatch.category = category
            return resMatch
        } else {
            // insert an artwork
            const artwork = await sb.artwork.insert(data)
            data.artworkId = artwork.id
            const resSpecific = await sb[category].insert(data)
            resolve(resSpecific)
        }
    })
}
module.exports = {

    matchRequest : async (request, type) => {
        // search in artwork DB
        const resRequest = await sb.artwork.findByName(request)
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
        return Promise.all(data.map((oneArtwork) => getOrInsertArtwork(oneArtwork)))
    }
}