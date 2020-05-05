
const validator = require('validator');
const {ErrorHandler} = require('../helpers')
module.exports = {
    model: (sequelize, DataTypes) => {
        const Subject = sequelize.define('Deposit', {
            // Specific information for the subject
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },

            geoloc: {
                type: DataTypes.GEOMETRY,
                allowNull: false,
            },

            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            
            expirationDate : {
                type: DataTypes.DATE,
                allowNull: false,
            },
            owner: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })

        return Subject;
    }
}