const spotify = require("./spotify")
const metMuseum = require("./metMuseum")
const Logger = require("../loaders/logger")
const {TYPES} = require("../config")
const apiList = [spotify, metMuseum]

module.exports = {
    search: async (request) => {
        // define all the apis that should be called
        const type = TYPES[request.category.toUpperCase()]
        let requiredAPIs = []
        if(type == null) {
            requiredAPIs = apiList
        }
        else {
            requiredAPIs = apiList.filter((api) => {return api.type == type})
        }
        // make the calls
        let result = []
        await Promise.all(requiredAPIs.map(async (api) => {
            const resOneApi = await api.search(request)
            // Logger.debug(JSON.stringify(resOneApi.map(res => {return `${res.url}-----${res.artist}`})))
            result.push(...resOneApi)
        }))
        return(result)
    }
};