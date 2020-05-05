const sb = require('../SB')
Logger = require('../loaders/logger')

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

    addOneReport: (nameReporter, depositId) => {
        Logger.warn("passage dans som1")
        sb.deposit.addReport(nameReporter,depositId).then((response) => {
            Logger.warn("passage dans som2")
            return sb.deposit.isReported(response)
        })

    }
}