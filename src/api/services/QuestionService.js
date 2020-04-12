const responseApi = require('../utils/responseApi')

const QuestionRepository = require('../repositories/QuestionRepository')
const AnswerRepository = require('../repositories/AnswerRepository')
const CustomerStageOneRepository = require('../repositories/CustomerStageOneRepository')

const trans = require('../repositories/Transactions')

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

        let questionResp = {}

        //abre transacao
        const transaction = await trans.begin()
        try {

            questionResp = await QuestionRepository.create(transaction, question)

            //commita transacao
            await trans.commit(transaction)
        } catch (error) {
            //volta transacao
            await trans.rollback(transaction)
        }

        return questionResp
    },

    async update(id, question) {

        let questionResp = {}

        //abre transacao
        const transaction = await trans.begin()
        try {
            if (question.answers && question.answers.length > 0)
                questionResp = await QuestionRepository.updateAndCreateQuestions(transaction, id, question)
            else
                questionResp = await QuestionRepository.update(transaction, id, question)

            //commita transacao
            await trans.commit(transaction)
        } catch (error) {
            //volta transacao
            await trans.rollback(transaction)
        }

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