//var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('../api');
var config = require('../config');
var morgan = require('morgan')
const logger = require('./logger')
const { handleError, ErrorHandler } = require('../helpers/')

var swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
var swaggerDocument = YAML.load('./swagger.yaml');

module.exports = (app) => {
  logger.info("starting express load")
  app.use(morgan("combined", { "stream": logger.stream }));

  // Health Check endpoints
  // @TODO Explain why they are here
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  var corsOptions = {
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:8080",
      "http://35.181.59.14:8080",
      "http://127.0.0.1:3000",
      "http://localhost:3000"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: ["Access-Control-Allow-Headers", "Origin", "X-Requested-With", "Content-Type", "Accept"]
    // credentials: true
  }
  app.use(cors(corsOptions));

  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // update to match the domain you will make the request from
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  // Load API routes
  const mainRouter = routes()
  app.use(config.api.prefix, mainRouter);
  mainRouter.use('/api-docs', swaggerUi.serve);
  mainRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new ErrorHandler(404, 'Not Found');
    next(err);
  });

  app.use((err, req, res, next) => {
    handleError(err, res);
  });
};
