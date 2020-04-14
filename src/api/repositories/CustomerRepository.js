const Customers = require('../models/Customer');
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
            attributes: { exclude: ['password'] }
        })
        return customer
    },

    async findByCustomerEmail(email) {
        const customer = await Customers.findAll({ where: { email } })
        return customer
    },

    async create(customer) {

        const id = uuidv4()
        const { name, email, password, active } = customer

        const customerResp = await Customers.create({ id, name, email, password, active })

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