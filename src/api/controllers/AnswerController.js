const AnswerService = require('../services/AnswerService');

module.exports = {
    async index(request, response) {

        const { question_id } = request.params

        const answers = await AnswerService.findAll(question_id);
        return response.json(answers);
    },

    async store(request, response) {

        const { question_id } = request.params

        const answer = await AnswerService.create(question_id, request.body)
        return response.json(answer);
        
    },

    async update(request, response) {
        const { id } = request.params
    
        const answer = await AnswerService.update(id, request.body)

        return response.json(answer)

    },
    async destroy(request, response) {
        const { id } = request.params

        await AnswerService.destroy(id)

        return response.json()
    },
}