var { Router, Request, Response } = require('express');
const services = require('../../services')
const ErrorHandler = require('../../helpers/')
const Logger = require('../../loaders/logger')
module.exports = (app) => {
    const route = Router()
    app.use('/artworkDeposits', route)

    
    route.post('/', (req, res, next) => {
        services.deposit.createDeposit(req.body).then((result) => {
            return res.json(result).status(200)
        }).catch((error) => {
            next(error)
        })
    })

    route.get('/', (req, res, next) => {
        const {long, limit , lat, distance} = req.query
        if (long && lat) {
            services.deposit.getNearestDeposits(long, lat, limit, distance).then((result) => {
                return res.json(result).status(200)
            }).catch((error) => {
                next(error)
            })
        } else {
            services.deposit.getAll().then((result) => {
                return res.json(result).status(200)
            }).catch((error) => {
                next(error)
            })
        }
    })

    route.get('/:depositId', (req, res, next) => {
        const { depositId } = req.params
        services.deposit.getDeposit(depositId).then((result) => {
            return res.json(result).status(200)
        }).catch((error) => {
            next(error)
        })
    })
    
    route.post('/reportDeposit', (req, res, next) => {
        const {nameReporter, depositId} = req.body
        //! Si ca marche pas, c est parce que c est pas dans le meme ordre que le body
        services.deposit.addOneReport(nameReporter, depositId).then(() => {
            res.status(200)
        }).catch((err) => {
            next(err)
        })
    })
};
