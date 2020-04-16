const spotify = require("./spotify")
const apiList = [spotify]

module.exports = {
    search: async (request, type) => {
        // define all the apis that should be called 
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
            result.push(...resOneApi)
        }))
        return(result)
    }
};