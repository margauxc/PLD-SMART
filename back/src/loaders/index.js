var expressLoader = require('./express')
var dbLoader = require('./db-sequelize')
var Logger = require('./logger')
//We have to import at least all the events once so they can be triggered
module.exports = async (app) => {
  await dbLoader(app);
  Logger.info('✌️ DB loaded and connected!');
  await expressLoader(app);
  Logger.info('✌️ Express loaded');
};
