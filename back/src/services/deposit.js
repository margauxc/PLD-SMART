const som = require('../SOM')
const {models} = require('../models')
const apimanager = require('../apimanager')
const { ErrorHandler } = require('../helpers')
const {validation} = require('../helpers')
/**
 * This is the artwork services
 */
function adapt(newDeposit) {
    const formatted = newDeposit.dataValues
    formatted.lat = newDeposit.geoloc.coordinates[0]
    formatted.long = newDeposit.geoloc.coordinates[1]
    formatted.depositId = newDeposit.id
    delete formatted.id
    delete formatted.geoloc
    delete formatted.updatedAt
    delete formatted.createdAt 
    return formatted
}
module.exports = {
    /**
     * This function creates a subject
     * @returns {Promise} a promise
     */
    createDeposit : (params) => {
        return new Promise(async (resolve, reject) => {
            validation.includeFields(params, ["artworkId"])
            var deposit = {
                artworkId : params.artworkId,
                lat : params.lat,
                long :  params.long
            }  
            resolve(adapt(await som.deposit.createDeposit(deposit)))
        })
    },
    getAll :() => {
        return new Promise(async (resolve,reject) =>{
            const allRes = await som.deposit.getAll()
            resolve(allRes.map(x => adapt(x)))
        })
    },
    getDeposit: (depositId) =>  {
        return new Promise(async (resolve,reject) =>{
            const deposit = adapt(await som.deposit.getDeposit(depositId))
            // get associated artwork
            const artwork = (await som.artwork.getArtwork(deposit.ArtworkId))
            resolve({...deposit,...artwork})
        })
    },
    getNearestDeposits: async (long, lat, nbDeposits) => {
        if (!nbDeposits) {
            nbDeposits = 1
        } else {
            nbDeposits = parseInt(nbDeposits,10)
        }
        return await som.deposit.getNearestDeposits(long, lat, nbDeposits)
    }
}
