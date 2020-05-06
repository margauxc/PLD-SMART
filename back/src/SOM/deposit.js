const sb = require('../SB')
var Logger = require('../loaders/logger')

module.exports = {
    getAll : () => {
        return sb.deposit.getAll()
    },
    
    createDeposit : (deposit) => {
        return sb.deposit.createDeposit(deposit)
    },

    getDeposit : (depositId) =>  {
        return sb.deposit.findById(depositId)
    },

    getNearestDeposits: (long, lat, nbDeposits, distance) => {
        return sb.deposit.findNearest(long, lat, nbDeposits, distance)
    },

    addOneReport: async (nameReporter, depositId) => {
        await sb.deposit.addReport(nameReporter,depositId)
        return sb.deposit.isReported(depositId)

    }
}