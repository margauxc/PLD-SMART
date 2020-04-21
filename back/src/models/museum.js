
const validator = require('validator');
const {ErrorHandler} = require('../helpers')
module.exports = {
    model: (sequelize, DataTypes) => {
        const Museum = sequelize.define('Museum', {
            // Specific information for the subject
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },

            url: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },

            artist : {
                type: DataTypes.STRING,
                allowNull: true,
            },

            classification: {
                type: DataTypes.STRING,
                allowNull: true
            },

            medium : {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },

            description: {
                type: DataTypes.STRING,
                allowNull: true,
                validate : {
                    notEmpty : true
                }
            }
        })

        return Museum;
    }
}