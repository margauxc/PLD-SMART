
const validator = require('validator');
const {ErrorHandler} = require('../helpers')
module.exports = {
    model: (sequelize, DataTypes) => {
        const Subject = sequelize.define('Artwork', {
            // Specific information for the subject
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },

            database: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },
            nbRef: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate : {
                    min : 0
                }
            },
            nbView: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate : {
                    min : 0
                }
            },

            importDate: {
                type: DataTypes.DATE,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },

            category: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },
        })

        return Subject;
    }
}