var { Router, Request, Response } = require('express');
const services = require('../../services')
const ErrorHandler = require('../../helpers/')
const Logger = require('../../loaders/logger')
module.exports = (app) => {
    const route = Router();
    app.use('/baseofroute', route);
    route.post('/', (req, res, next) => {
        services.subject.createSubject(req.body, req.user).then((result) => {
            return res.json(result).status(200)
        }).catch((error) => {
            next(error)
        })
    })
};
