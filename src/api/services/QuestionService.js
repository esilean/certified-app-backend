
const QuestionRepository = require('../repositories/QuestionRepository')

module.exports = {
    async findAll() {

        const questions = await QuestionRepository.findAll()

        return questions
    },

    async create(question) {

        const questionResp = await QuestionRepository.create(question)
        return questionResp
    },

    async update(id, question) {

        const questionResp = await QuestionRepository.update(id, question)
        return questionResp
    },
    async destroy(id) {
        await QuestionRepository.destroy(id)

    },
}