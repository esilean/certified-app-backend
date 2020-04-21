const AnswerRepository = require('../repositories/AnswerRepository')
const QuestionRepository = require('../repositories/QuestionRepository')
const CustomerStageOneRepository = require('../repositories/CustomerStageOneRepository')

const { ErrorHandler } = require('../error')

async function findAll(question_id) {
    const answers = await AnswerRepository.findAll(question_id)
    return answers
}

async function create(question_id, answer) {

    //verifica se a pergunta existe
    const questionExist = await QuestionRepository.findByPk(question_id)
    if (questionExist === null)
        throw new ErrorHandler(400, 'Not possible. Question id does not exist.')

    //verifica total de respostas certas, so pode existir 1 resposta correta
    const validAnswer = await validateValidAnswerOnCreating(question_id, answer)
    if (!validAnswer)
        throw new ErrorHandler(400, 'Not possible. Must be only one answer valid.')

    const answerResp = await AnswerRepository.create(question_id, answer)
    return answerResp

}

async function update(question_id, id, answer) {

    //verifica total de respostas certas, so pode existir 1 resposta correta
    const validAnswer = await validateValidAnswerOnUpdating(question_id, id, answer)
    if (!validAnswer)
        throw new ErrorHandler(400, 'Not possible. Must be only one answer valid.')

    const answerResp = await AnswerRepository.update(id, answer)
    return answerResp

}

async function destroy(id) {

    const answerHasStageOne = await CustomerStageOneRepository.findByAnswerId(id)
    if (answerHasStageOne.length > 0)
        return 'Not possible. Answer has at least one stage done.'

    await AnswerRepository.destroy(id)

}

module.exports = {
    findAll,
    create,
    update,
    destroy,
}

async function validateValidAnswerOnCreating(question_id, answer) {
    //verifica se a pergunta possui mais de 1 resposta correta
    const answers = await AnswerRepository.findAll(question_id)

    const answerValid = answers.filter(f => f.valid === true && f.active === true)
    if (answerValid && answerValid.length > 0) {
        if (answer.valid === 1) {
            return false
        }
    }

    return true
}

async function validateValidAnswerOnUpdating(question_id, id, answer) {
    //verifica se a pergunta possui mais de 1 resposta correta
    const answers = await AnswerRepository.findAll(question_id)

    const answerValid = answers.filter(f => f.valid === true && f.active === true)
    if (answerValid && answerValid.length > 0) {

        const answerExist = await AnswerRepository.findByPk(id)

        if (answer.valid === 1 && answerValid[0].id !== answerExist.id) {
            return false
        }
    }

    return true
}