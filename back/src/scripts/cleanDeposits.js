const config = require('../config');
const Logger = require('../loaders/logger')
const dbLoader = require('../loaders/db-sequelize')
const {models} = require('../models')
const { Op } = require("sequelize");
const moment = require('moment')

async function run() {
    // Logger.debug(`${process.env.NODE_ENV}`)
    await dbLoader()
    Logger.info(`**********
    begin clearing databse from deprecated deposits
    **********`)
    const nbSuppr = await models.Deposit.destroy({
        where: {
            expirationDate : 
            {
                [Op.lte]: moment().add(1,'days').toDate()
            }
        }
    })
    // const nbSuppr = await deprecatedDeposits.forEach.destroy()
    Logger.info(`${nbSuppr} deposits deleted`)
}

run()