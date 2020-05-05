const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const {validation} = require('../helpers')
const Logger = require("../loaders/logger")
var moment = require('moment')
const sequelize =  require ('sequelize')

async function getReportedOfDeposit(depositId) {
    var res = await models.Deposit.findOne({
      where: {
        id: depositId
      }
    })
    return res.reported
 }

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
            var reportedOld = await getReportedOfDeposit(depositId)
            var newReported = ""
            if(reportedOld == "") {
                newReported = nameReporter
            } else {
                newReported = reportedOld+";"+nameReporter
            }
            await models.Deposit.update(
                     {reported : newReported},
                     {where : {id : depositId}}
                 ).then(() => {
                     resolve()
                 }).catch( (err) => {
                     reject(err)
                 })
             })
    }, 
    // returning : true, [ rowUpdate, [updatedDeposit] ], updatedDeposit

    isReported: (depositId) => {
        return new Promise( async (resolve, reject) => {
            var reportedUpdate = await getReportedOfDeposit(depositId)
            if (reportedUpdate.split(";").length == 3) {
                models.Deposit.update(
                    {isReported : true},
                    {where : {id : depositId}}
                    ).then((res) => {
                        if(res == 0) {
                            throw new ErrorHandler(404, "No deposit found")
                        } else {resolve()}
                    }).catch( (err) => {
                        reject(err)
                    })
            } else {resolve()}
        })
    }
}
