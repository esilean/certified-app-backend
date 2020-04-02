const CustomerAttemptService = require('../services/CustomerAttemptService');


module.exports = {
    async index(request, response) {

        const { customer_id } = request.params

        const customerAttempts = await CustomerAttemptService.findByCustomerId(customer_id)

        return response.json(customerAttempts)
    },
    async indexStage(request, response) {

        const { customer_id, stage_id } = request.params

        const customerAttempts = await CustomerAttemptService.findByCustomerIdAndStage(customer_id, stage_id)

        return response.json(customerAttempts);
    },

    async store(request, response) {

        const { customer_id, stage_id } = request.params

        const customerAttempt = await CustomerAttemptService.create(customer_id, stage_id, request.body)


        if (customerAttempt.hasOwnProperty('statusCode'))
            return response.status(customerAttempt.statusCode).json(customerAttempt);

        return response.json(customerAttempt)

    },

    async update(request, response) {
        const { id } = request.params

        const customerAttempt = await CustomerAttemptService.update(id, request.body)

        return response.json(customerAttempt)

    },
    async destroy(request, response) {
        const { id } = request.params

        const resp = await CustomerAttemptService.destroy(id)

        return response.status(200).json(resp)
    },
}