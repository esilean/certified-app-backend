const AnswerRepository = require('../repositories/AnswerRepository')
const QuestionRepository = require('../repositories/QuestionRepository')
const CustomerStageOneRepository = require('../repositories/CustomerStageOneRepository')


module.exports = {
    async findAll(question_id) {
        const answers = await AnswerRepository.findAll(question_id)
        return answers
    },

    async create(question_id, answer) {


        //verifica se a pergunta existe
        const questionIdExist = await QuestionRepository.findByQuestionId(question_id)
        if (!questionIdExist || questionIdExist === null) {
            //retornar erro
        }

        //verifica total de respostas certas, so pode existir 1 resposta correta
        const validAnswer = await validateValidAnswerOnCreating(question_id, answer)
        if (validAnswer.statusCode === 404)
            return validAnswer

        const answerResp = await AnswerRepository.create(question_id, answer)
        return answerResp

    },

    async update(question_id, id, answer) {

        //verifica total de respostas certas, so pode existir 1 resposta correta
        const validAnswer = await validateValidAnswerOnUpdating(question_id, id, answer)
        if (validAnswer.statusCode === 404)
            return validAnswer


        const answerResp = await AnswerRepository.update(id, answer)
        return answerResp

    },
    async destroy(id) {

        const answerHasStageOne = await CustomerStageOneRepository.findByAnswerId(id)

        if (answerHasStageOne && answerHasStageOne.length === 0) {
            await AnswerRepository.destroy(id)
        } else {
            //retornar erro
        }

    },
}

async function validateValidAnswerOnCreating(question_id, answer) {
    //verifica se a pergunta possui mais de 1 resposta correta
    const answers = await AnswerRepository.findAll(question_id)

    const answerValid = answers.filter(f => f.valid === true && f.active === true)
    if (answerValid && answerValid.length > 0) {
        if (answer.valid === 1) {
            //retornar erro
        }
    }

}

async function validateValidAnswerOnUpdating(question_id, id, answer) {
    //verifica se a pergunta possui mais de 1 resposta correta
    const answers = await AnswerRepository.findAll(question_id)

    const answerValid = answers.filter(f => f.valid === true && f.active === true)
    if (answerValid && answerValid.length > 0) {

        const answerExist = await AnswerRepository.findByAnswerId(id)

        if (answer.valid === 1 && answerValid[0].id !== answerExist.id) {
            //retornar erro
        }
    }

    
}