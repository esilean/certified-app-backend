const CustomerAttemptQuestion = require('../models/CustomerAttemptQuestion');


module.exports = {

    async findByQuestionId(question_id) {

        const custAttemptQuestionResp = await CustomerAttemptQuestion.findAll({ where: { question_id } })

        return custAttemptQuestionResp
    },

    async findByAnswerId(answer_id) {

        const custAttemptQuestionResp = await CustomerAttemptQuestion.findAll({ where: { answer_id } })

        return custAttemptQuestionResp
    },

    async findByCustAttemptId(customer_attempt_id) {

        const custAttemptQuestionResp = await CustomerAttemptQuestion.findAll({ where: { customer_attempt_id } })

        return custAttemptQuestionResp
    },

    async bulkCreate(arrayCustAttQuestions) {

        const custAttemptQuestionResp = await CustomerAttemptQuestion.bulkCreate(arrayCustAttQuestions)

        return custAttemptQuestionResp

    },

    async create(customer_attempt_id, question_id, order) {

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