const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const {validation} = require('../helpers')
const Logger = require("../loaders/logger")
var moment = require('moment')

function adapt(newDeposit) {
    newDeposit.lat = newDeposit.geoloc.coordinates[0]
    newDeposit.long = newDeposit.geoloc.coordinates[1]
    newDeposit.depositId = newDeposit.id
    delete newDeposit.id
    delete newDeposit.geoloc
    delete newDeposit.updatedAt
    delete newDeposit.createdAt 
    return newDeposit
}

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
        var newDepositSequelize = await models.Deposit.create(deposit)
        var newDeposit = adapt(newDepositSequelize.dataValues)
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