const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const { validation } = require('../helpers')

/**
 * This is the subject SOM
 */
module.exports = {
    /**
     * This function creates a subject in the database
     * @returns {Promise} a promise
     */
    
    oneFunction : (user, urlSubject) => {
        return new Promise(async (resolve, reject) => {
            try {
                models.oneModel.create(params).then((subject) => {
                    resolve(subject)
                }).catch(models.Sequelize.ValidationError, (err) => {
                    throw new ErrorHandler(403, err.message)
                })
            } catch (err) { reject(err) }
        })
    },
}