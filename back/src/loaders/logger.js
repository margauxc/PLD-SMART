var winston = require('winston');
var config = require('../config');
const transports = [];
var logLevel = process.env.LOG_LEVEL
if (process.env.NODE_ENV === 'test') {
  logLevel = 'error'
}
if (process.env.NODE_ENV == 'test') {
  transports.push(
    new winston.transports.Console({
      level : logLevel
    })
  )
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    })
  )
}
const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports
});

LoggerInstance.stream = {
  write: function (message, encoding) {
    LoggerInstance.info(message);
  }
};

module.exports = LoggerInstance;