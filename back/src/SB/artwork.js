const som = require('../SOM')
const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const {validation} = require('../helpers')
/**
 * This is the subject services
 */
module.exports = {
    /**
     * This function creates a subject
     * @returns {Promise} a promise
     */
    findById : (user, urlSubject) => {
        return new Promise(async (resolve, reject) => {
            try {
                // await appel de SOM
            } catch (err) { reject(err) }
        })
    },
}