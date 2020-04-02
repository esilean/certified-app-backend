const responseApi = require('../utils/responseApi')

const AnswerRepository = require('../repositories/AnswerRepository')
const QuestionRepository = require('../repositories/QuestionRepository')
const CustomerAttemptQuestionRepository = require('../repositories/CustomerAttemptQuestionRepository')


module.exports = {
    async findAll(question_id) {
        const answers = await AnswerRepository.findAll(question_id)
        return answers
    },

    async create(question_id, answer) {

        // inicializar resposta de erro
        responseApi.statusCode = 200

        //verifica se a pergunta existe
        const questionIdExist = await QuestionRepository.findQuestionById(question_id)
        if (!questionIdExist || questionIdExist === null) {
            responseApi.statusCode = 404
            responseApi.resp = false
            responseApi.message = 'A \"pergunta\" para esta \"resposta\" não foi informada.'
            return responseApi
        }

        //verifica total de respostas certas, so pode existir 1 resposta correta
        const validAnswer = await validateValidAnswerOnCreating(question_id, answer)
        if (validAnswer.statusCode === 404)
            return validAnswer

        const answerResp = await AnswerRepository.create(question_id, answer)
        return answerResp

    },

    async update(question_id, id, answer) {

        // inicializar resposta de erro
        responseApi.statusCode = 200

        //verifica total de respostas certas, so pode existir 1 resposta correta
        const validAnswer = await validateValidAnswerOnUpdating(question_id, id, answer)
        if (validAnswer.statusCode === 404)
            return validAnswer


        const answerResp = await AnswerRepository.update(id, answer)
        return answerResp

    },
    async destroy(id) {

        const answerHasCustAttQuestion = await CustomerAttemptQuestionRepository.findByAnswerId(id)

        if (answerHasCustAttQuestion && answerHasCustAttQuestion.length === 0) {
            await AnswerRepository.destroy(id)
            responseApi.resp = true
            responseApi.message = 'Excluído com sucesso.'
        } else {
            responseApi.resp = false
            responseApi.message = 'Não será possível excluir esta \"resposta\".'
        }

        return responseApi

    },
}

async function validateValidAnswerOnCreating(question_id, answer) {
    //verifica se a pergunta possui mais de 1 resposta correta
    const answers = await AnswerRepository.findAll(question_id)

    const answerValid = answers.filter(f => f.valid === true && f.active === true)
    if (answerValid && answerValid.length > 0) {
        if (answer.valid === 1) {
            responseApi.statusCode = 404
            responseApi.resp = false
            responseApi.message = 'A \"pergunta\" já possui uma \"resposta\" verdadeira.'
            return responseApi
        }
    }

    return responseApi
}

async function validateValidAnswerOnUpdating(question_id, id, answer) {
    //verifica se a pergunta possui mais de 1 resposta correta
    const answers = await AnswerRepository.findAll(question_id)

    const answerValid = answers.filter(f => f.valid === true && f.active === true)
    if (answerValid && answerValid.length > 0) {

        const answerExist = await AnswerRepository.findAnswerById(id)

        if (answer.valid === 1 && answerValid[0].id !== answerExist.id) {
            responseApi.statusCode = 404
            responseApi.resp = false
            responseApi.message = 'A \"pergunta\" já possui uma \"resposta\" verdadeira.'
            return responseApi
        }
    }

    return responseApi
}