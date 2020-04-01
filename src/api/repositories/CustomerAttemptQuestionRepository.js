const CustomerAttemptQuestion = require('../models/CustomerAttemptQuestion');


module.exports = {

    async create(customer_attempt_id, question_id, custAttemptQuestion) {

        const { order } = custAttemptQuestion

        console.log(order)

        const custAttemptQuestionResp = await CustomerAttemptQuestion.create({ customer_attempt_id, question_id, order })

        return custAttemptQuestionResp

    },

    async update(id, custAttemptQuestion) {
        const { answer_id } = custAttemptQuestion

        await CustomerAttemptQuestion.update({
            answer_id
        }, {
            where: {
                id
            }
        })

        const custAttemptQuestionResp = await CustomerAttemptQuestion.findOne({ where: { id } })

        return custAttemptQuestionResp

    },
    async destroy(id) {

        await CustomerAttemptQuestion.destroy({ where: { id } })

    },
}