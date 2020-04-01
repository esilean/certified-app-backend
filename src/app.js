require("dotenv").config();

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require("http")
const { errors } = require('celebrate')

require('./database')

const app = express()
const server = http.Server(app)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('./configs/routes')(app)
require('./configs/routesProtected')(app)

app.use(errors())

module.exports = server 