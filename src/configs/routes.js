const { Router } = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const AuthController = require('../api/controllers/AuthController')
const AuthCustomerController = require('../api/controllers/AuthCustomerController')

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
    routes.delete('/:id', AuthController.destroy)

    const routesCli = Router()
    server.use('/cli', routesCli)

    routesCli.get('/', (request, response) => {
        return response.json({
            hello: 'Hello from the otherside'
        })
    })

    routesCli.post('/login', AuthCustomerController.login)
    routesCli.post('/signup', AuthCustomerController.signup)
    routesCli.post('/vtoken', AuthCustomerController.vtoken)

}