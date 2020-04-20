const sequelize = require('sequelize')
const CustomerStageOnes = require('../../database/models/CustomerStageOne');


module.exports = {

    async findByCustomerIdAndOrder(customer_stage_id, order) {
        const respCustStageOne = await CustomerStageOnes.findOne(
            {
                where: { customer_stage_id, order },
                include: [
                    {
                        association: 'question',
                        required: true,
                        include: [
                            {
                                association: 'answers',
                                required: true,
                            }
                        ]
                    }],
                order: sequelize.literal('rand()'),
            })

        return respCustStageOne
    },

    async findByQuestionId(question_id) {

        const respCustStageOne = await CustomerStageOnes.findAll({ where: { question_id } })

        return respCustStageOne
    },

    async findByAnswerId(answer_id) {

        const respCustStageOne = await CustomerStageOnes.findAll({ where: { answer_id } })

        return respCustStageOne
    },

    async findByCustomerStageId(customer_stage_id) {

        const respCustStageOne = await CustomerStageOnes.findAll({ where: { customer_stage_id } })

        return respCustStageOne
    },

    async bulkCreate(transaction, custStageOneArr) {

        const respCustStageOne = await CustomerStageOnes.bulkCreate(custStageOneArr, { transaction })

        return respCustStageOne

    },

    async create(customer_stage_id, question_id, custStageOne) {
        const { order, value } = custStageOne

        const respCustStageOne = await CustomerStageOnes.create({ customer_stage_id, question_id, order, value })

        return respCustStageOne

    },

    async update(id, custStageOne) {
        const { answer_id, value } = custStageOne

        await CustomerStageOnes.update({
            answer_id, value
        }, {
            where: {
                id
            }
        })

        const respCustStageOne = await CustomerStageOnes.findOne({ where: { id } })

        return respCustStageOne

    },
    async destroy(id) {

        await CustomerStageOnes.destroy({ where: { id } })

    },
}