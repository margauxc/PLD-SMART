const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const {validation} = require('../helpers')
/**
 * This is the subject services
 */
module.exports = {

    findByName : (nameArtwork) => {
        return  models.Artwork.findAll({
            where: {
                name: nameArtwork,
            }
        })
    },
    findById : (idArtwork) => {
        return models.Artwork.findOne({
            where : {
                id : idArtwork
            }
        })
    },
    insert : (data) => {
        return models.Artwork.create(data)
    }
}