const som = require('../SOM')
const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const {validation} = require('../helpers')

async function requestTransition(urlSubject,subject,idNextState) {
    return Promise.all([
        som.subject.transition(subject, idNextState),
        som.stateRecord.createRecord(urlSubject, idNextState)
    ])
}

/**
 * This is the subject services
 */
module.exports = {
    /**
     * This function creates a subject
     * @returns {Promise} a promise
     */
    oneFunction : (user, urlSubject) => {
        return new Promise(async (resolve, reject) => {
            try {
                // await appel de SOM
            } catch (err) { reject(err) }
        })
    },
}