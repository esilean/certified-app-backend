const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development';


const dbConfig = require(__dirname + '/config/config.json')[env];

const Users = require('./models/User')

const Questions = require('./models/Question')
const Answers = require('./models/Answer')

const Customers = require('./models/Customer')
const CustomerEmails = require('./models/CustomerEmail')


const Stages = require('./models/Stage')
const CustomerStages = require('./models/CustomerStage')
const CustomerStageOnes = require('./models/CustomerStageOne')

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