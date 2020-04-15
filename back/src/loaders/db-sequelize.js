const Sequelize = require('sequelize');
var Logger = require('./logger');
var {loadDbModels} = require('../models')
function sleep(delai){
    return new Promise(async (resolve,reject) => {
        setTimeout(() => {resolve()},delai)
    })
}
async function connectToDatabase(){
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