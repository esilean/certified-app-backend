const connection = require('../index')
const { generate: generateUser } = require("./auth")
const { generate: generateQuestions } = require("./questions")
const { generate: generateStages } = require("./stage")

generateUser()
generateQuestions()
generateStages()