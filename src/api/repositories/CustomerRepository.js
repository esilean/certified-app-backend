const Customers = require('../../database/models/Customer');
const { v4: uuidv4 } = require('uuid')

module.exports = {
    async findAll() {
        const customers = await Customers.findAll({
            attributes: { exclude: ['password'] }
        })
        return customers
    },

    async findByCustomerId(id) {
        const customer = await Customers.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: ['customerStages', 'customerEmails']
        })
        return customer
    },

    async findByCustomerEmail(email) {
        const customer = await Customers.findAll({ attributes: { exclude: ['password'] }, where: { email } })
        return customer
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