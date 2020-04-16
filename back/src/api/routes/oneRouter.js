var { Router, Request, Response } = require('express');
const services = require('../../services')
const ErrorHandler = require('../../helpers/')
const Logger = require('../../loaders/logger')
module.exports = (app) => {
    const route = Router();
    app.use('/baseofroute', route);
    route.get('/', (req, res, next) => {
        res.sendStatus(200)
    })
};
