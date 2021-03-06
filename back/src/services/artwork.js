const som = require('../SOM')
const {models} = require('../models')
const apimanager = require('../apimanager')
const { ErrorHandler } = require('../helpers')
const {validation} = require('../helpers')
/**
 * This is the artwork services
 */
module.exports = {
    /**
     * This function creates a subject
     * @returns {Promise} a promise
     */
    searchArtworks : (params) => {
        return new Promise(async (resolve, reject) => {
            var artworkIds = await som.artwork.matchRequest(params)
            if (artworkIds != null) {
                resolve(await som.artwork.getArtworkAll(artworkIds))
            }
            else {
                var artworksData = await apimanager.search(params)
                if (artworksData.length == 0) {
                    resolve([])
                }
                else {
                    resolve(await som.artwork.getOrInsertAll(artworksData, params))
                }
            }
        }).catch((err) => reject(err))
    },

    getArtworkById : (artworkId) => {
        return som.artwork.getArtwork(artworkId)
    },

    addFreeText: (params) => {
        // todo sanitize 
        validation.includeFields(params,['name','author','text'])
        return som.artwork.addFreeText(params)
    }
}
