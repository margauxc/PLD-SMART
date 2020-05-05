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

    createDeposit : (data) => {
        return new Promise(async (resolve,reject) => {
            var deposit = {
                //? avec une minuscule ça marche pas mais ça serait mieux
                ArtworkId: data.artworkId,
                geoloc: { type: 'Point', coordinates: [data.lat, data.long]},
                expirationDate: moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss")
            }
            var newDeposit = await models.Deposit.create(deposit).catch((err) => 
            {
                reject(new ErrorHandler(404,"no arrtwork with this ID"))
            })
            resolve(newDeposit)
        })
    },

    findById : (depositId) => {
        return models.Deposit.findOne({
            where : {
                id : depositId
            }
        })
    },

    findNearest: (long, lat, nbDeposit, maxDistance) => {
        const location = sequelize.literal(`ST_GeomFromText('POINT(${long} ${lat})')`);
        return models.Deposit.findAll({
            attributes: {
                include: [
                    [sequelize.fn('ST_Distance_Sphere', location, sequelize.col("geoloc")),'distance']
                ]
            },
            having: sequelize.where(sequelize.col('distance'), {[sequelize.Op.lte]: maxDistance}),
            order: [
                [sequelize.col('distance'), 'ASC']
            ],
            limit: nbDeposit
        })
    }, 

    addReport: (nameReporter, depositId) => {
        return new Promise(async (resolve, reject) => {
            Logger.warn("passage dans sb")
            await models.Deposit.update(
                {reported : ";"+nameReporter},
                {returning : true, where : {id : depositId}}
            ).then(function([ rowUpdate, [updatedDeposit] ]) {
                Logger.warn("passage dans sb then")
                resolve(updatedDeposit)
            }).catch( (err) => {
                reject(err)
            })
        })
    }, 

    isReported: (updatedDeposit) => {
        return new Promise((resolve, reject) => {
            if (updatedDeposit.reported.split(";").length == 3) {
                models.Deposit.update(
                    {isReported : true},
                    {where : {id : updatedDeposit.id}}
                ).then((res) => {
                    if(res == 0) {
                        throw new ErrorHandler(404, "No deposit found")
                    }
                }).catch( (err) => {
                    reject(err)
                })
            }
            resolve()
        })
    }
}
