var { Router, Request, Response } = require('express');
const services = require('../../services')
const ErrorHandler = require('../../helpers/')
const Logger = require('../../loaders/logger')
module.exports = (app) => {
    const route = Router()
    app.use('/artworks', route)

    
    route.get('/:artworkId', (req, res, next) => {
        // TODO get the param in the url, no body in a get
        const {artworkId} = req.params
        services.artwork.getArtworkById(artworkId).then((result) => {
            return res.json(result).status(200)
        }).catch((error) => {
            next(error)
        })
    })
    
    route.get('/', (req, res, next) => {
        services.artwork.searchArtworks(req.query).then((result) => {
            return res.json(result).status(200)
        }).catch((error) => {
            next(error)
        })
    })
    
};
