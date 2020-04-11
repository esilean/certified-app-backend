const responseApi = require('../utils/responseApi')

const QuestionRepository = require('../repositories/QuestionRepository')
const AnswerRepository = require('../repositories/AnswerRepository')
const CustomerStageOneRepository = require('../repositories/CustomerStageOneRepository')


module.exports = {
    async findAll() {

        const questions = await QuestionRepository.findAll()

        return questions
    },

    async findQuestionById(id) {

        const question = await QuestionRepository.findQuestionById(id)

        return question
    },

    async create(question) {

        const questionResp = await QuestionRepository.create(question)
        return questionResp
    },

    async storeImg(id, request) {

        const questionImg = await QuestionRepository.storeImg(id, request)
        return questionImg
    },

    async update(id, question) {

        let questionResp = {}
        if (question.answers && question.answers.length > 0)
            questionResp = await QuestionRepository.updateAndCreateQuestions(id, question)
        else
            questionResp = await QuestionRepository.update(id, question)

        return questionResp
    },
    async destroy(id) {

        responseApi.resp = false
        responseApi.message = 'Não será possível excluir esta \"pergunta\".'

        const questionHasAnswer = await AnswerRepository.findAll(id)
        if (questionHasAnswer && questionHasAnswer.length === 0) {
            const questionHasStageOne = await CustomerStageOneRepository.findByQuestionId(id)

            if (questionHasStageOne && questionHasStageOne.length === 0) {
                await QuestionRepository.destroy(id)
                responseApi.resp = true
                responseApi.message = 'Excluído com sucesso.'
            }
        }

        return responseApi
    }
}