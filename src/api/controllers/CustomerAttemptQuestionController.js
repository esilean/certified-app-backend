const CustomerAttemptQuestionService = require('../services/CustomerAttemptQuestionService');


module.exports = {

    async store(request, response) {

        const { customer_attempt_id, question_id } = request.params

        const customerAttemptQuest = await CustomerAttemptQuestionService.create(customer_attempt_id, question_id, request.body)

        return response.json(customerAttemptQuest)

    },

    async update(request, response) {
        const { id } = request.params

        const customerAttemptQuest = await CustomerAttemptQuestionService.update(id, request.body)

        return response.json(customerAttemptQuest)

    },
    async destroy(request, response) {
        const { id } = request.params

        await CustomerAttemptQuestionService.destroy(id)

        return response.json()
    },
}