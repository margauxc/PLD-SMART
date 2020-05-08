const validator = require('validator');
const {ErrorHandler} = require('../helpers')
module.exports = {
    model: (sequelize, DataTypes) => {
        const Movie = sequelize.define('Movie', {
            // Specific information for the subject
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
                validate : {
                    notEmpty : true
                }
            },
            director: {
                type: DataTypes.TEXT,
                allowNull: true,
                validate : {
                    notEmpty : true
                }
            },
            url: {
                type: DataTypes.TEXT,
                allowNull: true,
                validate : {
                    notEmpty : true
                }
            },
        })

        return Movie;
    }
}