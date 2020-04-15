const CustomerStages = require('../models/CustomerStage');
const CustomerStageOne = require('../models/CustomerStageOne');


module.exports = {
    async findByCustomerId(customer_id) {

        const respCustStage = await CustomerStages.findAll(
            {
                where: { customer_id },
                include: ['customerStageOnes'],
            }
        )

        return respCustStage
    },
    async findCurrentStage(customer_id, stage_id) {

        const respCustStage = await CustomerStages.findOne(
            {
                where: { customer_id, stage_id },
                include: ['stage', 'customerStageOnes'],
                order: [['updated_at', 'desc'], [{ model: CustomerStageOne, as: 'customerStageOnes' }, 'order', 'asc']]
            }
        )

        return respCustStage
    },

    async create(transaction, customer_id, stage_id, custStage) {

        const { questions_qty, duration_min, grade_perc_min } = custStage

        const respCustStage = await CustomerStages.create({ customer_id, stage_id, questions_qty, duration_min, grade_perc_min, approved: 0 }, { transaction })

        return respCustStage

    },

    async update(id, custStage) {

        await CustomerStages.update(custStage, {
            where: {
                id
            }
        })

        const respCustStage = await CustomerStages.findOne({ where: { id }, include: ['stage', 'customerStageOnes'] })

        return respCustStage

    },
    async destroy(id) {

        await CustomerStages.destroy({ where: { id } })

    },
}