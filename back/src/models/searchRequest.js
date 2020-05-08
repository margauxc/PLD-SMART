
const validator = require('validator');
const {ErrorHandler} = require('../helpers')
module.exports = {
    model: (sequelize, DataTypes) => {
        const SearchRequest = sequelize.define('SearchRequest', {
            // Specific information for the subject
            hashRequest : {
                type : DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            }
        })
        return SearchRequest;
    }
}