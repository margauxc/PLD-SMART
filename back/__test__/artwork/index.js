const supertest = require('supertest');
const {base,templates} = require('./templates')
const artworkSOM = require('../../src/SOM/artwork')
module.exports = {
    createAndGetArtwork : async (data, type) => {
        return await artworkSOM.getOrInsert(data,"request"+type)
    }
}