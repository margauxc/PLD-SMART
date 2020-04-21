const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const { validation } = require('../helpers')

module.exports = {
    findByArtworkId : (artworkIdSearch) => {
        return models.Museum.findOne({
            where : {
                artworkId : artworkIdSearch
            }
        })
    },
    findExactMatch : (data) => {
        const urlSearch = data.url
        return models.Museum.findOne({
            where : {
                url : urlSearch
            }
        })
    },
    insert : (data) => {
        return models.Museum.create(data)
    }
}