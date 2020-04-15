const supertest = require('supertest');
const {base, templates} = require('./templates')
let app = require('../../src/app.js')
const utils = require('./index')
require('iconv-lite').encodingExists('cesu8') // *! is needed for encoding between mysql & jest
require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');
const {resetDatabase} = require('../../src/models/index')
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

describe('one route', () => {
    const route = ""
    const testRoute = base+route
    test('one test', async () => {
        const sessionAgent = supertest.agent(app)
        expect(2).toBe(2)
    })
    test('another', async () => {
        const sessionAgent = supertest.agent(app)
        expect(2).not.toBe(2)
    })

})