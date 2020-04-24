const {models} = require('../models')
const { ErrorHandler } = require('../helpers')
const { validation } = require('../helpers')

module.exports = {
    checkInCache : (hashRequestParam) => {
        return new Promise((resolve,reject) => {
            models.SearchRequest.findOne({
                where : {
                    hashRequest : hashRequestParam
                },
            }).then((res) => {
                if(res == null){
                    resolve(null)
                }
                else{
                    resolve(res.getArtworks().map((artwork => artwork.id)))
                }
            })
        })
    },
    insertEntry : (request, artworks) => {
        return models.SearchRequest.create({
            hashRequest : request
        })
    }


}