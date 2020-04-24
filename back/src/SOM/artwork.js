const sb = require('../SB')
const {TYPES} = require('../config')
function getArtworkById(artworkId){
    return new Promise(async (resolve,reject) => {
        try{
            const globalArtwork = await sb.artwork.findById(artworkId)
            // find appropriate DB
            const category = globalArtwork.category
            var specificArtwork = (await sb[category].findByArtworkId(artworkId)).dataValues
            resolve(adaptArtwork(specificArtwork,globalArtwork))
        } catch(error){
            reject(error)
        }
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
    const copyFields = ['category','name','pictureLink','date']
    copyFields.forEach((field) => {
        fullArtwork[field] = globalArtwork[field]
    })
    return fullArtwork
}

module.exports = {

    matchRequest : async (request) => {
        // search in artwork DB
        var resRequest;
        if (request.category != null){
            resRequest = await sb.artwork.findByNameCategory(request.rawQuery,request.category)
        }
        else{
            resRequest = await sb.artwork.findByNameOnly(request.rawQuery)
        }
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
    addFreeText : async (data) => {
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
        return result
    }   
}