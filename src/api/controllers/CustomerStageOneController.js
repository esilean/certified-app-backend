const CustomerStageOneService = require('../services/CustomerStageOneService');


module.exports = {

    async findByCustomerIdAndOrder(request, response) {
        const { customer_stage_id, order } = request.params

        const respCustStageOne = await CustomerStageOneService.findByCustomerIdAndOrder(customer_stage_id, order)

        return response.json(respCustStageOne)

    },

    async store(request, response) {

        const { customer_stage_id, question_id } = request.params

        const respCustStageOne = await CustomerStageOneService.create(customer_stage_id, question_id, request.body)

        return response.json(respCustStageOne)

    },

    async update(request, response) {
        const { id } = request.params

        const respCustStageOne = await CustomerStageOneService.update(id, request.body)

        return response.json(respCustStageOne)

    },
    async destroy(request, response) {
        const { id } = request.params

        await CustomerStageOneService.destroy(id)

        return response.json()
    },
}