
const validator = require('validator');
const {ErrorHandler} = require('../helpers')
module.exports = {
    model: (sequelize, DataTypes) => {
        const FreeText = sequelize.define('FreeText', {
            // Specific information for the subject
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },

            text: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },
        })

        return FreeText;
    }
}