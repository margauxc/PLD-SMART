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
    createDeposit : (params) => {
        return new Promise(async (resolve, reject) => {
            validation.includeFields(params, ["artworkId"])
            var deposit = {
                artworkId : params.artworkId,
                lat : params.lat,
                long :  params.long
            }  
            resolve(som.deposit.createDeposit(deposit))
        })
    },
    getAll :() => {
        return som.deposit.getAll();
    },
    getDeposit : (depositId) =>  {
        return som.deposit.getDeposit(depositId);
    }
}
