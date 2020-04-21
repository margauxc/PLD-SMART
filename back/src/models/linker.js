module.exports = (sequelize, DataTypes, database) => {
    // give music its artwork
    database['Movie'].belongsTo(database['Artwork'], {foreignKey : {allowNull : false}})
    database['Music'].belongsTo(database['Artwork'], {foreignKey : {allowNull : false}})
    database['Museum'].belongsTo(database['Artwork'], {foreignKey : {allowNull : false}})
    database['Deposit'].belongsTo(database['Artwork'], {foreignKey : {allowNull : false}})
    database['FreeText'].belongsTo(database['Artwork'], {foreignKey : {allowNull : false}})
 
}
