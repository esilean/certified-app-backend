const CustomerEmails = require('../models/CustomerEmail');

module.exports = {


    async findAll(customer_id) {
        const respEmails = await CustomerEmails.findAll({ where: { customer_id }, include: 'customer' })
        return respEmails
    },

    async findByPk(id) {
        const respEmail = await CustomerEmails.findByPk(id)
        return respEmail
    },

    async create(customer_id, email) {

        const { email_from, email_to, email_body, subject } = email

        const respEmail = await CustomerEmails.create({ customer_id, email_from, email_to, email_body, subject, })
        return respEmail

    },

    async update(id, email) {

        const { messageId, error } = email

        await Customers.update({
            messageId, error,
        }, {
            where: {
                id
            }
        })

        const respEmail = await CustomerEmails.findByPk(id, { include: 'customer' })

        return respEmail

    },

}