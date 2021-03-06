const supertest = require('supertest');
const {base,templates} = require('./templates')
const artworkSOM = require('../../src/SOM/artwork')
const utilsArtwork = require('../artwork/index')

module.exports = {
    createAndGetDeposit : async (sessionAgent,data, type) => {
        const artworkObject = await utilsArtwork.createAndGetArtwork(data,type)
        var params = templates[""].POST
        params.artworkId = artworkObject.ArtworkId
        const response = await sessionAgent
                            .post(base)
                            .send(params)
        expect(response.status).toBe(200)
        return response.body
    },
    reportAndCheck : async (sessionAgent, depositId, nameReporter, expectedReported) => {
        const reportParams = {
            depositId : depositId,
            nameReporter : nameReporter
        }
        var reportResponse = await  sessionAgent.post(base+"/reportDeposit").send(reportParams)
        expect(reportResponse.status).toBe(200)
        var getRouteFilled = (base+"/:DepositId").replace(':DepositId',depositId)
        var getResponse = await sessionAgent.get(getRouteFilled)
        var expectedStatus = 200
        if(expectedReported){
            expectedStatus = 404
        }
        expect(getResponse.status).toBe(expectedStatus)
    }
}