const Sequelize = require('sequelize');
var Logger = require('./logger');
var {loadDbModels} = require('../models')
const wkx = require('wkx') // needed to correct sequelize bug with GeomFromText
function sleep(delai){
    return new Promise(async (resolve,reject) => {
        setTimeout(() => {resolve()},delai)
    })
}
async function connectToDatabase(){
    
    //! Next lines needed to correct this bug : https://github.com/sequelize/sequelize/issues/9786
    Sequelize.GEOMETRY.prototype._stringify = function _stringify(value, options) {
    return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
    }
    Sequelize.GEOMETRY.prototype._bindParam = function _bindParam(value, options) {
    return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
    }
    Sequelize.GEOGRAPHY.prototype._stringify = function _stringify(value, options) {
    return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
    }
    Sequelize.GEOGRAPHY.prototype._bindParam = function _bindParam(value, options) {
    return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
    }

    var connectionOK = false
    let connectionItem;
    while(!connectionOK){
        try{
            connectionItem = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
                host: process.env.DATABASE_HOST,
                dialect: process.env.DATABASE_DIALECT,
                port: process.env.DATABASE_PORT,
                logging: msg => Logger.debug(msg)
            });
            await connectionItem.authenticate()
                .then(() => {
                    Logger.info('Connection has been established successfully.');
                    connectionOK = true
                }).catch(async (error) => {
                    console.log("Unable to connect to DB : "+error+" \nwaiting for retry ...")
                    await sleep(2000)
                })
        } catch(error) {
            console.log("Unable to connect to DB : "+error+"\nwaiting for retry ...")
            await sleep(2000)
        } 
    }
    return connectionItem
}
module.exports = async (app) => {
    const sequelizeItem = await connectToDatabase()
    await sequelizeItem
        .authenticate()
       
    await loadDbModels(sequelizeItem)
    app.emit("ready")
}