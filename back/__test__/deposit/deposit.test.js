const supertest = require('supertest');
const {TYPES} = require('../../src/config')
let app = require('../../src/app.js')
const {resetDatabase} = require('../../src/models/index')

require('iconv-lite').encodingExists('cesu8') // *! is needed for encoding between mysql & jest
require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');

const {mock} = require('../artwork/templates')
const utilsArtwork = require('../artwork/index')

const {base, templates} = require('./templates')
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

describe('Post one deposit', () => {
    const route = ""
    const testRoute = base+route
    test('post a deposit for all types', async () => {
        const sessionAgent = supertest.agent(app)
        const allTypes = Object.keys(TYPES)
        for(var i = 0; i< allTypes.length; i++){
            const type = allTypes[i]
            const artworkObject = await utilsArtwork.createAndGetArtwork(mock[type],type)
            var params = templates[route].POST
            params.artworkId = artworkObject.ArtworkId
            const response = await sessionAgent
                                .post(testRoute)
                                .send(params)
            expect(response.status).toBe(200)
        }
    })
    test('use wrong id', async () => {
        const sessionAgent = supertest.agent(app)
        var params = templates[route].POST
        params.artworkId = "PasUnVraiId"
        const response = await sessionAgent
                            .post(testRoute)
                            .send(params)
        expect(response.status).toBe(404)
    })
})

describe('get one deposit', () => {
    const route = ""
    const testRoute = base+route+"/:DepositId"
    test('get a deposit for all types', async () => {
        const sessionAgent = supertest.agent(app)
        const allTypes = Object.keys(TYPES)
        for(var i = 0; i< allTypes.length; i++){
            const type = allTypes[i]            
            const depositObject = await utils.createAndGetDeposit(sessionAgent, mock[type],type)
            var testRouteFilled = testRoute.replace(':DepositId',depositObject.depositId)
            const response = await sessionAgent
                                .get(testRouteFilled)
            expect(response.status).toBe(200)
        }
    })
})
describe('get all deposits', () => {
    const route = ""
    const testRoute = base+route
    test('get a deposit for all types', async () => {
        const sessionAgent = supertest.agent(app)
        const depositObject = await utils.createAndGetDeposit(sessionAgent, mock["MUSIC"],"MUSIC")
        const response = await sessionAgent
                            .get(testRoute)
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
    })
})
describe('report a deposit', () => {
    const route = "/reportDeposit"
    const testRoute = base+route
    test('report a deposit', async () => {
        const sessionAgent = supertest.agent(app)
        const depositObject = await utils.createAndGetDeposit(sessionAgent, mock["MUSIC"],"MUSIC")
        var getRouteFilled = (base+"/:DepositId").replace(':DepositId',depositObject.depositId)
        // the deposit isn't reported
        var getResponse = await sessionAgent.get(getRouteFilled)
        expect(getResponse.body.isReported).toBe(false)

        await utils.reportAndCheck(sessionAgent,depositObject.depositId,"a",false)
        await utils.reportAndCheck(sessionAgent,depositObject.depositId,"b",false)
        await utils.reportAndCheck(sessionAgent,depositObject.depositId,"c",true)
        getResponse = await sessionAgent.get(getRouteFilled)
        expect(getResponse.body.isReported).toBe(true)

    })
})