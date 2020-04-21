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
            // TODO reactivate cache after fix
            if (artworkIds.length != 0) {
                resolve(await som.artwork.getArtworkAll(artworkIds))
            }
            else {
                var artworksData = await apimanager.search(params)
                if (artworksData.length == 0) {
                    resolve([])
                }
                else {
                    resolve(await som.artwork.getOrInsertAll(artworksData))
                }
            }
        }).catch((err) => reject(err))
    },

    getArtworkById : (artworkId) => {
        return new Promise(async (resolve, reject) => {
            resolve(await som.artwork.getArtwork(artworkId))
        })
    }
}
