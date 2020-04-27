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
    }
}