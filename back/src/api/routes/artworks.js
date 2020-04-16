var { Router, Request, Response } = require('express');
const services = require('../../services')
const ErrorHandler = require('../../helpers/')
const Logger = require('../../loaders/logger')
module.exports = (app) => {
    const route = Router()
    app.use('/artworks', route)

    
    route.get('/:idArtwork', (req, res, next) => {
        services.artwork.getArtworkById(req.body.artworkId).then((result) => {
            return res.json(result).status(200)
        }).catch((error) => {
            next(error)
        })
    })
    
    route.get('/', (req, res, next) => {
        services.artwork.searchArtworks(req.body).then((result) => {
            return res.json(result).status(200)
        }).catch((error) => {
            next(error)
        })
    })
    
};
