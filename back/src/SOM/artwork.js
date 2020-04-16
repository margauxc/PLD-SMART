module.exports = {
    /**
     * This function creates a subject
     * @returns {Promise} a promise
     */
    matchRequest : (request, type) => {
        // search in artwork DB
        // if there is a match for request + type, return all the IDs

        // return the full objects
        return new Promise(async (resolve, reject) => {
            try {
                // await appel de SOM
            } catch (err) { reject(err) }
        })
    },

    getArtwork : (artworkId) => {
        // get in artwork DB
        // call appropriate SB to get full info
        // TODO
    },

    getArtworkAll: (artworkIds) => {
        // TODO
    },

    getOrInsert : (data) => {
        // Tries to match the data with the corresponding DB, insert it or finds its id
        // TODO

    },

    getOrInsertAll : (data) => {
        // TODO
    }
}