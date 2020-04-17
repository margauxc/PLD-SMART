const sb = require('../SB')

module.exports = {
    getAll : () => {
        return sb.deposit.getAll()
    },
    
    createDeposit : (deposit) => {
        return sb.deposit.createDeposit(deposit)
    },

    getDeposit : (depositId) =>  {
        return sb.deposit.findById(depositId);
    }
}