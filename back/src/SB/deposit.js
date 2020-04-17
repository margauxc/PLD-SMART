const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const {validation} = require('../helpers')
var moment = require('moment');

module.exports = {

    getAll : () => {
        return  models.Deposit.findAll()
    },

    createDeposit : (data) => {
        var deposit = {
            artworkId: data.artworkId,
            geoloc: { type: 'Point', coordinates: [data.lat, data.long]},
            expirationDate: moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss")
        }
        return models.Deposit.create(create)
    },
    findById : (depositId) => {
        return models.Deposit.findOne({
            where : {
                id : depositId
            }
        })
    }
    
}