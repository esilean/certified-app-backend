const connection = require('../index')
const { generate: generateUser } = require("./auth")
const { generate: generateQuestions } = require("./questions")

generateUser()
generateQuestions()
