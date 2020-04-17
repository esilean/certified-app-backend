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
    async findCurrentStage(customer_id) {

        const respCustStage = await CustomerStages.findOne(
            {
                where: { customer_id },
                include: ['stage', 'customerStageOnes'],
                order: [['stage_id', 'desc'], ['updated_at', 'desc'], [{ model: CustomerStageOne, as: 'customerStageOnes' }, 'order', 'asc']]
            }
        )

        return respCustStage
    },

    async findByPkToCalculateResult(id) {

        const respCustStage = await CustomerStages.findByPk(id,
            {
                attributes: ['id', 'date_ini', 'date_end', 'questions_qty', 'duration_min', 'grade_perc_min'],
                include: [
                    {
                        attributes: ['id', 'answer_id', 'value'],
                        association: 'customerStageOnes',
                        required: true,
                        include: [{
                            attributes: ['id'],
                            association: 'question',
                            required: true,
                            include: [{
                                attributes: ['id'],
                                association: 'answers',
                                required: true,
                                where: {
                                    valid: true
                                }
                            }]
                        }]
                    },
                ],
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