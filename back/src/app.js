var config = require('./config');

var express = require('express');

var Logger = require('./loaders/logger');
var loaders = require('./loaders')
const app = express();
async function startServer() {
  loaders(app)
  await app.on("ready", async () => {
    if(process.env.NODE_ENV != 'test'){
      await app.listen(config.port || 3000, async err => {
        if (err) {
          Logger.error(err);
          process.exit(1);
          return;
        }
      });
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
    }
    
    await app.emit("listening")

  })
}
startServer();

module.exports = app