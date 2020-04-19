const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const {validation} = require('../helpers')
const Logger = require("../loaders/logger")
var moment = require('moment')
const sequelize =  require ('sequelize')



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
    },

    findNearest: (long, lat, nbDeposit) => {
        const location = sequelize.literal(`ST_GeomFromText('POINT(${long} ${lat})')`);
        return models.Deposit.findAll({
            attributes: {
                include: [
                    [sequelize.fn('ST_Distance_Sphere', location, sequelize.col("geoloc")),'distance']
                ]
            },
            // where: sequelize.where(sequelize.fn('ST_Distance_Sphere', sequelize.literal('geoloc'), location))
            order: [
                [sequelize.col('distance'), 'ASC']
            ],
            limit: nbDeposit
        })
    }
    
}