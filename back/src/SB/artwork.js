const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const {validation} = require('../helpers')
/**
 * This is the subject services
 */
module.exports = {

    findByName : (nameArtwork,category) => {
        return  models.Artwork.findAll({
            where: {
                name: nameArtwork,
                category : category
            }
        })
    },
    findById : (idArtwork) => {
        return new Promise((resolve,reject) => {
            models.Artwork.findOne({
                where : {
                    id : idArtwork
                }
            }).then((res) => {
                if( res != null) {
                    resolve(res)
                }
                else{
                    throw new ErrorHandler(404, "No artwork with this id")
                }
            }).catch((err) => reject(err))
        })
    },
    insert : (data) => {
        return models.Artwork.create(data)
    }
}