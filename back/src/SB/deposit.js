const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const {validation} = require('../helpers')
const Logger = require("../loaders/logger")
var moment = require('moment')



module.exports = {

    getAll : () => {
        return  models.Deposit.findAll()
    },

    createDeposit : async (data) => {
        var deposit = {
            //? avec une minuscule ça marche pas mais ça serait mieux
            ArtworkId: data.artworkId,
            geoloc: { type: 'Point', coordinates: [data.lat, data.long]},
            expirationDate: moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss")
        }
        var newDeposit = await models.Deposit.create(deposit)
        return newDeposit
    },
    findById : (depositId) => {
        return models.Deposit.findOne({
            where : {
                id : depositId
            }
        })
    }
    
}