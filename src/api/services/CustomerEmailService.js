const CustomerEmailRepository = require('../repositories/CustomerEmailRepository');


module.exports = {

    async findAll(customer_id) {

        const respEmails = await CustomerEmailRepository.findAll(customer_id)

        return respEmails

    },

    async create(customer_id, email) {

        const respEmail = await CustomerEmailRepository.create(customer_id, email)

        return respEmail

    },

    async update(id, email) {

        const respEmail = await CustomerEmailRepository.update(id, email)

        return respEmail

    },
}