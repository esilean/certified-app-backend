const CustomerService = require('../services/CustomerService');

module.exports = {
    async index(request, response) {
        const customers = await CustomerService.findAll()
        return response.json(customers)
    },

    async store(request, response) {

        customer = await CustomerService.create(request.body)

        return response.json(customer)
    },

    async update(request, response) {
        const { id } = request.params

        const customer = await CustomerService.update(id, request.body)

        return response.json(customer)

    },
    async destroy(request, response) {
        const { id } = request.params

        await CustomerService.destroy(id)

        return response.json()
    },
}