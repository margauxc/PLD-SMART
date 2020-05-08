const som = require('../SOM')
const {models} = require('../models')
const apimanager = require('../apimanager')
const { ErrorHandler } = require('../helpers')
const {validation} = require('../helpers')
const Logger =require("../loaders/logger")
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
    return formatted
}
module.exports = {
    /**
     * This function creates a subject
     * @returns {Promise} a promise
     */
    createDeposit : (params) => {
        return new Promise(async (resolve, reject) => {
            try{
                validation.includeFields(params, ["artworkId","owner", "lat", "long"])
                var deposit = {
                    artworkId : params.artworkId,
                    lat : params.lat,
                    long :  params.long,
                    owner: params.owner
                }  
                const result = await som.deposit.createDeposit(deposit)
                resolve(adapt(result))

            }catch(err){
                reject(err)
            }
        })
    },
    getAll :() => {
        return new Promise(async (resolve,reject) =>{
            const allRes = await som.deposit.getAll()
            resolve(allRes.map(x => adapt(x)))
        })
    },
    getDeposit: (depositId) =>  {
        return new Promise(async (resolve,reject) => {
            som.deposit.getDeposit(depositId).then((deposit) => {
                deposit = adapt(deposit)
                // get associated artwork
                som.artwork.getArtwork(deposit.ArtworkId).then((artwork) => {
                    resolve({...deposit,...artwork})
                }).catch((err) => reject(err))
            }).catch((err) => reject(err))
        })
    },
    getNearestDeposits: async (long, lat, nbDeposits, distance) => {
        if (!nbDeposits) {
            nbDeposits = 1
        } else {
            nbDeposits = parseInt(nbDeposits,10)
        }
        if(!distance) {
            distance = 100
        } else {
            distance = parseInt(distance, 10)
        }
        const result =  await som.deposit.getNearestDeposits(long, lat, nbDeposits, distance)
        return result.map(deposit => adapt(deposit))
    }, 
    addOneReport: (nameReporter, depositId) => {
        //? async ?
        return new Promise( async (resolve, reject) => {
            try {
                await som.deposit.addOneReport(nameReporter,depositId)
                resolve()
            } catch(error) {
                reject(error)
            }
        })
    }
}
