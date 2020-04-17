var { Router, Request, Response } = require('express');
const services = require('../../services')
const ErrorHandler = require('../../helpers/')
const Logger = require('../../loaders/logger')
module.exports = (app) => {
    const route = Router()
    app.use('/artworkDeposits', route)

    
    route.post('/', (req, res, next) => {
        services.deposits.createDeposit(req.body).then((result) => {
            return res.json(result).status(200)
        }).catch((error) => {
            next(error)
        })
    })

    route.get('/', (req, res, next) => {
        service.deposit.getAll().then((result) => {
            return res.json(result).status(200)
        }).catch((error) => {
            next(error)
        })
    })

    route.get('/:depositId', (req, res, next) => {
        const { depositId } = req.params
        service.deposit.getDeposit(depositId).then((result) => {
            return res.json(result).status(200)
        }).catch((error) => {
            next(error)
        })
    })
    
};
