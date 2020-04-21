const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const { validation } = require('../helpers')

module.exports = {
    findByArtworkId : (artworkIdSearch) => {
        return models.Movie.findOne({
            where : {
                artworkId : artworkIdSearch
            }
        })
    },
    findExactMatch : (data) => {
        return null 
        // TODO do a real match
    },
    insert : (data) => {
        return models.Movie.create(data)
    }
}