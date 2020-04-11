
const QuestionService = require('../services/QuestionService')

module.exports = {
    async index(request, response) {
        const { id } = request.params

        const questions = await QuestionService.findAll()

        if (id) {
            let question = await QuestionService.findQuestionById(id)
            if(question === null)
                return response.status(400).send()

            return response.json(question)
        }

        return response.json(questions)
    },

    async store(request, response) {

        const question = await QuestionService.create(request.body)

        return response.json(question)
    },

    async update(request, response) {
        const { id } = request.params

        const question = await QuestionService.update(id, request.body)

        return response.json(question)

    },
    async destroy(request, response) {
        const { id } = request.params

        const resp = await QuestionService.destroy(id)

        return response.status(200).json(resp)
    },
}