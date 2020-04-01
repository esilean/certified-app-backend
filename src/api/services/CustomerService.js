const CustomerRepository = require('../repositories/CustomerRepository');

module.exports = {
    async findAll() {
        const customers = await CustomerRepository.findAll()
        return customers
    },

    async create(customer) {

        const customerResp = await CustomerRepository.create(customer)

        return customerResp
    },

    async update(id, customer) {

        const customerResp = await CustomerRepository.update(id, customer)

        return customerResp

    },
    async destroy(id) {

        await CustomerRepository.destroy(id)
    },
}