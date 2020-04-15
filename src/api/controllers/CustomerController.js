const CustomerService = require('../services/CustomerService');

module.exports = {
    async index(request, response) {
        const { id } = request.params

        if (id) {
            let customer = await CustomerService.findByCustomerId(id)
            if (customer === null)
                return response.status(400).send()

            return response.json(customer)
        } else {
            const customers = await CustomerService.findAll()
            return response.json(customers)
        }
    },

    async update(request, response) {
        const { id } = request.params

        const customer = await CustomerService.update(id, request.body)

        return response.json(customer)

    },
    async destroy(request, response) {
        const { id } = request.params

        const resp = await CustomerService.destroy(id)

        return response.status(200).json(resp)
    },
}