const AnswerService = require('../services/AnswerService');
const { ErrorHandler } = require('../error')


async function index(request, response) {

    const { question_id } = request.params

    const answers = await AnswerService.findAll(question_id);
    return response.json(answers);
}

async function create(request, response, next) {
    const { question_id } = request.params

    try {

        const answer = await AnswerService.create(question_id, request.body)
        return response.json(answer);

    } catch (error) {
        next(error)
    }

}

async function update(request, response, next) {
    const { question_id, id } = request.params

    try {

        const answer = await AnswerService.update(question_id, id, request.body)
        return response.json(answer)

    } catch (error) {
        next(error)
    }

}

async function destroy(request, response, next) {
    const { id } = request.params

    try {

        const resp = await AnswerService.destroy(id)
        if (resp)
            throw new ErrorHandler(400, resp)

        return response.status(204).send()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    index,
    create,
    update,
    destroy,
}