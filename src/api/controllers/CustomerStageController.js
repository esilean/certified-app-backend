const CustomerStageService = require('../services/CustomerStageService');


module.exports = {
    async index(request, response) {

        const { customer_id } = request.params

        const customerStages = await CustomerStageService.findByCustomerId(customer_id)

        return response.json(customerStages)
    },
    async findCurrentStage(request, response) {

        const { customer_id, stage_id } = request.params

        const customerStages = await CustomerStageService.findCurrentStage(customer_id, stage_id)

        return response.json(customerStages);
    },

    async store(request, response) {

        const { customer_id, stage_id } = request.params

        const customerStage = await CustomerStageService.create(customer_id, stage_id, request.body)


        if (customerStage.hasOwnProperty('statusCode'))
            return response.status(customerStage.statusCode).json(customerStage);

        return response.json(customerStage)

    },

    async update(request, response) {
        const { id } = request.params

        const customerStage = await CustomerStageService.update(id, request.body)

        return response.json(customerStage)

    },
    async result(request, response) {
        const { id } = request.params

        const customerStage = await CustomerStageService.calculateResult(id)

        return response.json(customerStage)

    },    
    async destroy(request, response) {
        const { id } = request.params

        const resp = await CustomerStageService.destroy(id)

        return response.status(200).json(resp)
    },
}