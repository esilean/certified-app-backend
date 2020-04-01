const AnswerRepository = require('../repositories/AnswerRepository');

module.exports = {
    async findAll(question_id) {
        const answers = await AnswerRepository.findAll(question_id)
        return answers
    },

    async create(question_id, answer) {

        const answerResp = await AnswerRepository.create(question_id, answer)
        return answerResp

    },

    async update(id, answer) {

        const answerResp = await AnswerRepository.update(id, answer)

        return answerResp

    },
    async destroy(id) {

        await AnswerRepository.destroy(id)
    },
}