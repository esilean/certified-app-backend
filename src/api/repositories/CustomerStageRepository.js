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
                include: ['customerStageOnes'],
                order: [['updated_at', 'desc'], [{model: CustomerStageOne, as: 'customerStageOnes'}, 'order', 'asc']]
            }
        )

        return respCustStage
    },

    async create(transaction, customer_id, stage_id, custStage) {

        const { date_ini } = custStage

        const respCustStage = await CustomerStages.create({ customer_id, stage_id, date_ini, approved: 0 }, { transaction })

        return respCustStage

    },

    async update(id, custStage) {
        const { date_end, approved } = custStage

        await CustomerStages.update({
            date_end, approved
        }, {
            where: {
                id
            }
        })

        const respCustStage = await CustomerStages.findOne({ where: { id } })

        return respCustStage

    },
    async destroy(id) {

        await CustomerStages.destroy({ where: { id } })

    },
}