const { Router } = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const AuthController = require('../api/controllers/AuthController')

module.exports = function (server) {

    const routes = Router()
    server.use('/sec', routes)

    routes.get('/', (request, response) => {
        return response.json({
            hello: 'Hello from the otherside'
        })
    })

    routes.post('/login', AuthController.login)
    routes.post('/signup', AuthController.signup)
    routes.post('/vtoken', AuthController.vtoken)

}