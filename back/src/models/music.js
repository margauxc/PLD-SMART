
const validator = require('validator');
const {ErrorHandler} = require('../helpers')
module.exports = {
    model: (sequelize, DataTypes) => {
        const Music = sequelize.define('Music', {
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
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },

            album : {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },

            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },
        })

        return Music;
    }
}