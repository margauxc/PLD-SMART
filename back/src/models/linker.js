module.exports = (sequelize, DataTypes, database) => {
    // give music its artwork
    database['Music'].belongsTo(database['Artwork'], {foreignKey : {allowNull : false}})
    database['Deposit'].belongsTo(database['Artwork'], {foreignKey : {allowNull : false}})
    database['FreeText'].belongsTo(database['Artwork'], {foreignKey : {allowNull : false}})
 
}
