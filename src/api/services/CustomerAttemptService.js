const CustomerAttemptRepository = require('../repositories/CustomerAttemptRepository');


module.exports = {
    async findByCustomerId(customer_id) {

        const customerAttempts = await CustomerAttemptRepository.findByCustomerId(customer_id)

        return customerAttempts
    },
    async findByCustomerIdAndStage(customer_id, stage_id) {

        const customerAttempts = await CustomerAttemptRepository.findByCustomerIdAndStage(customer_id, stage_id)

        return customerAttempts
    },

    async create(customer_id, stage_id, custAttempt) {

        const customerAttempt = await CustomerAttemptRepository.create(customer_id, stage_id, custAttempt)

        return customerAttempt

    },

    async update(id, custAttempt) {

        const customerAttempt = await CustomerAttemptRepository.update(id, custAttempt)

        return customerAttempt

    },
    async destroy(id) {

        await CustomerAttemptRepository.destroy(id)

    },
}