const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const { validation } = require('../helpers')

module.exports = {
    findByArtworkId : (artworkIdSearch) => {
        return models.FreeText.findOne({
            where : {
                artworkId : artworkIdSearch
            }
        })
    },
    findExactMatch : (data) => {
       return false
    },
    insert : (data) => {
        return models.FreeText.create(data)
    }
}