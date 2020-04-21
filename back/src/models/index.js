const { Sequelize, DataTypes } = require('sequelize')
// const loaderSequelize = require('../loaders/db-sequelize')

// sub models
const Artwork = require('./artwork')
const Music = require('./music')
const Deposit = require('./deposit')
const Museum = require('./museum')
// association manager
const linker = require('./linker')
async function resetDatabase(){
    // TODO regroup to factor with loadDbModels 
    await db.sequelize.sync({ force: true })
}
var db = {}
async function loadDbModels(sequelize) {
    //var sequelize = loaderSequelize()
    db['Artwork'] = await Artwork.model(sequelize, DataTypes)
    db['Music'] = await Music.model(sequelize, DataTypes)
    db['Deposit'] = await Deposit.model(sequelize, DataTypes)
    db['Museum'] = await Museum.model(sequelize, DataTypes)

    await linker(sequelize, DataTypes, db)

    await Object.keys(db).forEach(async modelName => {
        if (db[modelName].associate) {
            await db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize
    db.Sequelize = Sequelize
    const resetAll = (process.env.DATABASE_RESET_ALL == "true")
    await db.sequelize.sync({ force: resetAll })
    if (resetAll) {
        // await OneModel.init(db)
    }
}
module.exports = {loadDbModels, resetDatabase, models : db}