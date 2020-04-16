const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const {validation} = require('../helpers')
/**
 * This is the subject services
 */
module.exports = {

    findByName : (nameArtwork) => {
        return  models.artwork.find({
            where: {
                name: nameArtwork,
            }
        })
    },
    findById : (idArtwork) => {
        return models.artwork.findOne({
            where : {
                id : idArtwork
            }
        })
    },
    insert : (data) => {
        return models.artwork.create(data)
    }
}