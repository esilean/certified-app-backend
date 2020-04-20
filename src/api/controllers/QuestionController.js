const QuestionService = require('../services/QuestionService')

const { ErrorHandler } = require('../error')

module.exports = {
    async index(request, response, next) {
        const { id } = request.params

        try {

            if (id) {
                const question = await QuestionService.findByPk(id)
                if (question === null)
                    throw new ErrorHandler(404, 'Question not found.')

                return response.json(question)
            } else {
                const questions = await QuestionService.findAll()
                return response.json(questions)
            }
        } catch (error) {
            next(error)
        }

    },

    async store(request, response) {

        const question = await QuestionService.create(request.body)

        return response.json(question)
    },

    async update(request, response, next) {
        const { id } = request.params

        try {

            const question = await QuestionService.update(id, request.body)

            return response.json(question)

        } catch (error) {
            next(error)
        }

    },
    async destroy(request, response, next) {
        const { id } = request.params

        try {

            const resp = await QuestionService.destroy(id)
            if (resp)
                throw new ErrorHandler(400, resp)

            return response.status(204).send()
        } catch (error) {
            next(error)
        }

    },
}