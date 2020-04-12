
const connection = require('../../../database')

async function begin() {
    let t = await connection.transaction()
    return t
}

async function commit(transaction) {
    await transaction.commit()
}

async function rollback(transaction) {
    await transaction.rollback()
}

module.exports = {
    begin,
    commit,
    rollback
}


