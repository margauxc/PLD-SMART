const sb = require('../SB')

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
        sb.deposit.addReport(nameReporter,depositId).then((response) => {
            return sb.deposit.isReported(response)
        })

    }
}