const Sequelize = require('sequelize')
const dbConfigProd = require('../configs/mysql/databaseProd')
const dbConfigTest = require('../configs/mysql/databaseTest')

const dbConfig = process.env.NODE_ENV === 'test' ? dbConfigTest : dbConfigProd

const Users = require('../api/models/User')

const Questions = require('../api/models/Question')
const Answers = require('../api/models/Answer')

const Stages = require('../api/models/Stage')

const Customers = require('../api/models/Customer')
const CustomerAttempts = require('../api/models/CustomerAttempt')
const CustomerAttemptQuestion = require('../api/models/CustomerAttemptQuestion')

const connection = new Sequelize(dbConfig)

Users.init(connection)

Questions.init(connection)
Answers.init(connection)

Stages.init(connection)

Customers.init(connection)
CustomerAttempts.init(connection)
CustomerAttemptQuestion.init(connection)

Questions.associate(connection.models)
Answers.associate(connection.models)
Stages.associate(connection.models)
Customers.associate(connection.models)

CustomerAttempts.associate(connection.models)
CustomerAttemptQuestion.associate(connection.models)



module.exports = connection