const CustomerEmailService = require('../services/CustomerEmailService');

module.exports = {
    async index(request, response) {

        const { customer_id } = request.params

        const customerEmails = await CustomerEmailService.findAll(customer_id)
        return response.json(customerEmails);
    },
}