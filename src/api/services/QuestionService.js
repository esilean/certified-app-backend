const QuestionRepository = require('../repositories/QuestionRepository')
const AnswerRepository = require('../repositories/AnswerRepository')
const CustomerStageOneRepository = require('../repositories/CustomerStageOneRepository')

const trans = require('../repositories/Transactions')

async function findAll() {

    const questions = await QuestionRepository.findAll()

    return questions
}

async function findByPk(id) {

    const question = await QuestionRepository.findByPk(id)

    return question
}

async function create(question) {

    const transaction = await trans.begin()
    try {

        const respQuestion = await QuestionRepository.create(transaction, question)
        await trans.commit(transaction)

        return respQuestion
    } catch (error) {
        await trans.rollback(transaction)
        throw error
    }

}

async function update(id, question) {

    let respQuestion = null

    const transaction = await trans.begin()
    try {
        if (question.answers && question.answers.length > 0)
            respQuestion = await QuestionRepository.updateAndCreateQuestions(transaction, id, question)
        else
            respQuestion = await QuestionRepository.update(transaction, id, question)

        await trans.commit(transaction)
    } catch (error) {
        await trans.rollback(transaction)
        throw error
    }

    return respQuestion
}

async function destroy(id) {

    const questionHasAnswer = await AnswerRepository.findAll(id)
    if (questionHasAnswer.length > 0)
        return 'Not possible. Question has answers.'


    const questionHasStageOne = await CustomerStageOneRepository.findByQuestionId(id)
    if (questionHasStageOne.length > 0)
        return 'Not possible. Question has at least one stage done.'

    await QuestionRepository.destroy(id)

    return
}

module.exports = {
    findAll,
    findByPk,
    create,
    update,
    destroy,
}