const sb = require('../SB')

module.exports = {
    getAll : () => {
        return sb.deposit.getAll()
    },
    
    createDeposit : () => {
        return sb.deposit.createDeposit()
    },

    getDeposit : (depositId) =>  {
        return sb.deposit.findById(depositId);
    }
}