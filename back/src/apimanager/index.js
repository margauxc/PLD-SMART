const spotify = require("./spotify")
const metMuseum = require("./metMuseum")
const tmdb = require("./tmdb")

const Logger = require("../loaders/logger")
const ErrorHandler = require('../helpers/')

const apiList = [spotify, tmdb, metMuseum]
module.exports = {
    search: async (request) => {
        // define all the apis that should be called 
        let requiredAPIs = []
        if(request.category == null) {
            requiredAPIs = apiList
        }
        else {
            requiredAPIs = apiList.filter((api) => {
                return api.type == request.category})
        }
        // make the calls
        let result = []
        await Promise.all(requiredAPIs.map( (api) => {
            return new Promise((resolve,reject) => {
                api.search(request).then((resOneApi) => {
                    result.push(...resOneApi)
                    resolve()
                }).catch((err) => {
                    Logger.warn("call to api failed")
                    reject()
                })
            })
        }))
        return(result)
    }
};