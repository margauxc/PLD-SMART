module.exports = (sequelize, DataTypes, database) => {
    // give subjects a ref employee
    /*database['Employee'].hasMany(database['Subject'], { foreignKey: { allowNull: false } })
    database['Subject'].belongsTo(database['Employee'])

    // give subjects a state
    database['Subject'].belongsTo(database['StateSubject'], { foreignKey: { defaultValue: 0 } }) 

    //give records a subject
    database['StateRecord'].belongsTo(database['Subject'], {foreignKey : {allowNull : false}})

    //give records a state
    database['StateRecord'].belongsTo(database['StateSubject'], {foreignKey : {allowNull : false}})
    
    //give comment a subject
    database['Comment'].belongsTo(database['Subject'], {foreignKey : {allowNull : false}})*/
}
