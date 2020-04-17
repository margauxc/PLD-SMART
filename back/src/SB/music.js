const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const { validation } = require('../helpers')

module.exports = {
    findByArtworkId : (artworkIdSearch) => {
        return models.Music.findOne({
            where : {
                artworkId : artworkIdSearch
            }
        })
    },
    findExactMatch : (data) => {
        const urlSearch = data.url
        return models.Music.findOne({
            where : {
                url : urlSearch
            }
        })
    },
    insert : (data) => {
        return models.Music.create(data)
    }
}