const Customers = require('../models/Customer');

module.exports = {
    async findAll() {
        const customers = await Customers.findAll()
        return customers
    },

    async create(customer) {

        const { name, email, cpf, active } = customer

        const customerResp = await Customers.create({ name, email, cpf, active })
        
        return customerResp
    },

    async update(id, customer) {

        const { name, email, cpf, active } = customer

        await Customers.update({
            name, email, cpf, active,
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