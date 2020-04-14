const CustomerStageOneRepository = require('../repositories/CustomerStageOneRepository');

const AnswerRepository = require('../repositories/AnswerRepository');


module.exports = {

    async findByCustomerIdAndOrder(customer_stage_id, order) {

        const respCustStageOne = await CustomerStageOneRepository.findByCustomerIdAndOrder(customer_stage_id, order)

        return respCustStageOne

    },

    async create(customer_stage_id, question_id, custStageOne) {

        const respCustStageOne = await CustomerStageOneRepository.create(customer_stage_id, question_id, custStageOne)

        return respCustStageOne

    },

    async update(id, custStageOne) {

        const { answer_id } = custStageOne

        const answer = await AnswerRepository.findByAnswerId(answer_id)
        if (answer === null)
            return null

        const respCustStageOne = await CustomerStageOneRepository.update(id, custStageOne)

        return respCustStageOne

    },
    async destroy(id) {

        await CustomerStageOneRepository.destroy(id)

    },
}