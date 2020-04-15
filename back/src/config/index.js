var dotenv = require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })
if (!dotenv) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  // Your favorite port
  port: parseInt(process.env.PORT, 10),

  // That long string from mlab
  databaseURL: process.env.SQL_DATABASE_URL,

  // Your secret sauce
  jwtSecret: process.env.JWT_SECRET,

  // Used by winston logger
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  // API configs
  api: {
    prefix: '/api',
  },
};
