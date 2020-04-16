const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const { validation } = require('../helpers')

module.exports = {
    findByArtworkId : (artworkIdSearch) => {
        return models.music.findOne({
            where : {
                artworkId : artworkIdSearch
            }
        })
    },
    findExactMatch : (data) => {
        const urlSearch = data.url
        return models.music.findOne({
            where : {
                url : urlSearch
            }
        })
    },
    insert : (data) => {
        return models.music.create(data)
    }
}