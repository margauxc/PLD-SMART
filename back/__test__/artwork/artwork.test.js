const supertest = require('supertest');
const {TYPES} = require('../../src/config')
let app = require('../../src/app.js')
const {resetDatabase} = require('../../src/models/index')

require('iconv-lite').encodingExists('cesu8') // *! is needed for encoding between mysql & jest
require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');


const {base, templates, mock} = require('./templates')
const utils = require('./index')


beforeAll(async () => {
    return new Promise((resolve,reject) => {
        app.on("listening", function(){
            setTimeout(() => {resolve()},2000)
        }); 
    });
},30000)
beforeEach(async (done) => {
    await resetDatabase();
    done()
})

describe('Get one Artwork route', () => {
    const route = ""
    const testRoute = base+route+"/:ArtworkId"
    test('get one artwork all types', async () => {
        const sessionAgent = supertest.agent(app)
        const allTypes = Object.keys(TYPES)
        for(var i = 0; i< allTypes.length; i++){
            const type = allTypes[i]
            const artworkObject = await utils.createAndGetArtwork(mock[type],type)
            var testRouteFilled = testRoute.replace(':ArtworkId',artworkObject.ArtworkId)
            const response = await sessionAgent
                                .get(testRouteFilled)
            expect(response.status).toBe(200)
        }
    })
    test('get wrong id', async () => {
        const sessionAgent = supertest.agent(app)
        var testRouteFilled = testRoute.replace(':ArtworkId',"pasunId")
        const response = await sessionAgent
                            .get(testRouteFilled)
        expect(response.status).toBe(404)
    })
})
describe('Post free text', () => {
    const route = "/text"
    const testRoute = base+route
    test('normal case', async () => {
        const sessionAgent = supertest.agent(app)
        const response = await sessionAgent
                            .post(testRoute)
                            .send(templates[route].POST)
        expect(response.status).toBe(200)
    })
})