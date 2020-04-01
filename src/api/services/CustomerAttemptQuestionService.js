const CustomerAttemptQuestionRepository = require('../repositories/CustomerAttemptQuestionRepository');


module.exports = {

    async create(customer_attempt_id, question_id, custAttemptQuestion) {

        const custAttemptQuestionResp = await CustomerAttemptQuestionRepository.create(customer_attempt_id, question_id, custAttemptQuestion)

        return custAttemptQuestionResp

    },

    async update(id, custAttemptQuestion) {

        const custAttemptQuestionResp = await CustomerAttemptQuestionRepository.update(id, custAttemptQuestion)

        return custAttemptQuestionResp

    },
    async destroy(id) {

        await CustomerAttemptQuestionRepository.destroy(id)

    },
}