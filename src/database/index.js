const Sequelize = require('sequelize')
const dbConfigProd = require('../configs/mysql/databaseProd')
const dbConfigTest = require('../configs/mysql/databaseTest')

const dbConfig = process.env.NODE_ENV === 'test' ? dbConfigTest : dbConfigProd

const Users = require('../api/models/User')

const Questions = require('../api/models/Question')
const Answers = require('../api/models/Answer')

const Customers = require('../api/models/Customer')
const CustomerEmails = require('../api/models/CustomerEmail')


const Stages = require('../api/models/Stage')
const CustomerStages = require('../api/models/CustomerStage')
const CustomerStageOnes = require('../api/models/CustomerStageOne')

const connection = new Sequelize(dbConfig)



Users.init(connection)

Questions.init(connection)
Answers.init(connection)

Stages.init(connection)

Customers.init(connection)
CustomerEmails.init(connection)

CustomerStages.init(connection)
CustomerStageOnes.init(connection)

Questions.associate(connection.models)
Answers.associate(connection.models)
Stages.associate(connection.models)
Customers.associate(connection.models)

CustomerEmails.associate(connection.models)
CustomerStages.associate(connection.models)
CustomerStageOnes.associate(connection.models)

module.exports = connection