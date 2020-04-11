const Customers = require('../models/Customer');

module.exports = {
    async findAll() {
        const customers = await Customers.findAll()
        return customers
    },

    async findByCustomerId(id) {
        const customer = await Customers.findByPk(id)
        return customer
    },

    async findByCustomerEmail(email) {
        const customer = await Customers.findAll({ where: { email } })
        return customer
    },

    async create(customer) {

        const { name, email, password, active } = customer

        const customerResp = await Customers.create({ name, email, password, active })

        return customerResp
    },

    async update(id, customer) {

        const { name, active } = customer

        await Customers.update({
            name, active,
        }, {
            where: {
                id
            }
        })

        const customerResp = await Customers.findOne({ where: { id } })

        return customerResp

    },
    async destroy(id) {

        await Customers.destroy({ where: { id } })
    },
}