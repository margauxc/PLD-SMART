module.exports = (sequelize, DataTypes, database) => {
    // give music its artwork
    database['Music'].belongsTo(database['Artwork'], {foreignKey : {allowNull : false}})
}
