const CustomerAttempts = require('../models/CustomerAttempt');


module.exports = {
    async findByCustomerId(customer_id) {

        const customerAttempts = await CustomerAttempts.findAll({ where: { customer_id }, include: ['stage', 'customer', 'customerAttempts'] })

        return customerAttempts
    },
    async findByCustomerIdAndStage(customer_id, stage_id) {

        const customerAttempts = await CustomerAttempts.findAll({ where: { customer_id, stage_id }, include: ['stage', 'customer', 'customerAttempts'] })

        return customerAttempts
    },

    async create(customer_id, stage_id, custAttempt) {

        const { date_ini } = custAttempt

        const customerAttempt = await CustomerAttempts.create({ customer_id, stage_id, date_ini, approved: 0 })

        return customerAttempt

    },

    async update(id, custAttempt) {
        const { date_end, approved } = custAttempt

        await CustomerAttempts.update({
            date_end, approved
        }, {
            where: {
                id
            }
        })

        const customerAttempt = await CustomerAttempts.findOne({ where: { id } })

        return customerAttempt

    },
    async destroy(id) {

        await CustomerAttempts.destroy({ where: { id } })

    },
}